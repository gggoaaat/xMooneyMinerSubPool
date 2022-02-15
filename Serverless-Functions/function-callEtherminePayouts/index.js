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

exports.getEtherminePayouts = async function (req, res) {
    console.log("Start")

    const url = 'https://api.ethermine.org/miner/07B253040706B26920F47a8C82Fb245E6E230Dce/payouts'

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
            /* const { rows } = await pool.query(
                 'INSERT INTO "MinerData"."MinerPayoutStats"("Algo", "Data") VALUES($1, $2)',
                 [StartPackage.Algo, StartPackage.Data]
             )*/

            try {

                const currentStatRecord = StartPackage.Data.data.sort((a, b) => {
                    return a.paidOn - b.paidOn;
                });;

                for (let index = 0; index < currentStatRecord.length; index++) {

                    const element = currentStatRecord[index];

                    const previousElement = index == 0 ? { paidPrevious : 0 } : { paidPrevious : currentStatRecord[index-1].paidOn };
                    
                    try {
                        const { thisReturn } = await pool.query(
                            'INSERT INTO "MinerData"."Payout_Log"(' +
                            '"Algo", start, "end", amount, "txHash", "paidOn", "paidPrevious")' +
                            'VALUES ($1, $2, $3, $4, $5, $6, $7)',
                            [StartPackage.Algo, element.start, element.end, element.amount, element.txHash, element.paidOn, previousElement.paidPrevious]
                        )

                        console.log(index + "." + element);
                    } catch (error) {
                        if (!(error && error.details && error.details.includes("already exists.")) && !(error && error.detail && error.detail.includes("already exists."))) {
                            console.log(error)
                        }
                    }

                    //const queryData = await pool.query('UPDATE "MinerData"."MinerStats" SET "Processed" = true, "ProcessDate" = Now() Where "SnapTime" = $1', [currentStatRecord[index].SnapTime])

                }
            } catch (e) {
                console.log('failed', e)
            }

            //console.log(rows)
            res.send({ result : "success " });
        } catch (e) {
            console.log('failed', e)
            res.send({ result : "failed " });
        }

        return true;
    }

    handler(req, res);

    return true;
}
