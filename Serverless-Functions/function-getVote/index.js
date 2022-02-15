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

exports.processedPayouts = async function (req, res) {
    const handler = async (req, res) => {
        try {
            console.log("Load Data")

            try {
                console.log("Begin Transaction")
                const { thisReturn2 } = await pool.query(
                    'BEGIN Transaction; ' + 
                    '' +
                    '   INSERT INTO "MinerData"."TempPayout_Archive"(' +
                    '       "PayOutID", "Miner", "Martian", "WalletAddress", "Ethereum Mined", "Mooney Earned", "Mooney Bonus", "Mooney Earned w Reflections", "Mining Period Avg Hashrate", "Period Reported Hashrate Avg", "Period Current Hashrate Avg", "Mining Period Shares", "Worker Mining Period Share", "Pool Period Mined Amount", "Successful Pulse", processed, "Total Workers", "Time Available")' +
                    '   SELECT "PayOutID", "Miner", "Martian", "WalletAddress", "Ethereum Mined",' +
                    '       "Mooney Earned", "Mooney Bonus", "Mooney Earned w Reflections", ' +
                    '       "Mining Period Avg Hashrate", "Period Reported Hashrate Avg", ' +
                    '       "Period Current Hashrate Avg", "Mining Period Shares", ' +
                    '       "Worker Mining Period Share", "Pool Period Mined Amount", ' +
                    '       "Successful Pulse", processed, ' +
                    '       "Total Workers", "Time Available"' +
                    '    FROM "MinerData"."api_Payout" ' + 
                    '    Where "processed"=true and "PayOutID" not in (Select distinct "PayOutID" FROM "MinerData"."TempPayout_Archive");' +
                    'COMMIT TRANSACTION;'
                )         
                console.log("End Transaction")
                res.send({ result : "success ", data : thisReturn2 });
                             
            } catch (e3) {
                console.log('failed', e3);
                res.send({ result : "failed ", data : e3 });
            }

            //console.log(rows)
            
        } catch (e) {
            console.log('failed', e)
            res.send({ result : "failed ", data : e });
        }

        return true;
    }

    handler(req, res);

    return true;
}
