/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

//const { Pool, Client } = require('pg');
const express = require('express')
const fetch = require('node-fetch')
const { Pool } = require('pg')
const pool = require('./postgres')

exports.getEthermine = async function (req, res) {
    console.log("Start")

    const url = 'https://api.ethermine.org/miner/07B253040706B26920F47a8C82Fb245E6E230Dce/dashboard'

    const handler = async (req, res) => {
        try {
            console.log("Fetch Call")
            const apiResponse = await fetch(url)
            const apiJson = await apiResponse.json()

            console.log("Load Data")
            const StartPackage = {
                PoolNetwork: "Ethermine",
                Coin: "Ethereum (Eth)",
                Data: apiJson,
                Algo: "Ethash"
            }

            console.log("Query Call")
            const { rows } = await pool.query(
                'INSERT INTO "MinerData"."MinerStats"("PoolNetwork", "SnapTime", "Coin", "Algo", "Data") VALUES($1, Now(), $2, $3, $4)',
                [StartPackage.PoolNetwork, StartPackage.Coin, StartPackage.Algo, StartPackage.Data]
            )

            try {
                const queryData = await pool.query('SELECT "PoolNetwork", "SnapTime", "Coin", "Data", "Algo", "Processed" ' +
                    'FROM "MinerData"."MinerStats" ' +
                    'Where "Processed" = false ' +
                    'Order by "ID" asc ' +
                    'Limit 100')
                //res.send(data.rows)
                //console.log(queryData)
                const currentStatRecord = queryData.rows;

                for (let index = 0; index < currentStatRecord.length; index++) {

                    const element = currentStatRecord[index].Data.data.workers;

                    for (let currentWorkers = 0; currentWorkers < element.length; currentWorkers++) {
                        const currentWorker = element[currentWorkers];
                        //console.log(currentWorker);
                        try {
                            const { thisReturn } = await pool.query(
                                'INSERT INTO "MinerData"."Worker_Log"(' +
                                'worker, "time", "lastSeen", "reportedHashrate", "currentHashrate", "validShares", "invalidShares", "staleShares")' +
                                'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                                [currentWorker.worker, currentWorker.time, currentWorker.lastSeen, currentWorker.reportedHashrate, currentWorker.currentHashrate, currentWorker.validShares, currentWorker.invalidShares, currentWorker.staleShares]
                            )

                            console.log(index + "." + currentWorkers);
                        } catch (error) {
                            if (!(error && error.details && error.details.includes("already exists.")) && !(error && error.detail && error.detail.includes("already exists."))) {
                                console.log(error)
                            }
                        }
                    }

                    const queryData = await pool.query('UPDATE "MinerData"."MinerStats" SET "Processed" = true, "ProcessDate" = Now() Where "SnapTime" = $1', [currentStatRecord[index].SnapTime])


                }
            } catch (e) {
                console.log('failed', e)
            }

            console.log(rows)
            res.send(rows)
        } catch (e) {
            console.log('failed', e)
        }

        return true;
    }

    handler(req, res);

    return true;
}
