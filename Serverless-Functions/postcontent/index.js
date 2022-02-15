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

exports.updateCurrentCycle = async function (req, res) {
    const handler = async (req, res) => {
        try {
            console.log("Load Data")

            try {

                 const { thisReturn } = await pool.query(
                    'BEGIN Transaction; ' + 
                    '' +
                    'Truncate "MinerData"."TempActive"; ' +
                    'INSERT INTO "MinerData"."TempActive"(' +
                    '"Martian", worker, "Mining Period Hashrate", "Time Available", "Period Shares", "Period Pool Total Shares", "My Period Share", "Avg Valid Shares", "Pool Period Mined Amount", "PayOutID", "Successful Pulse", "Total Pulse", "Avg Valid reportedHashrate", "Total Valid currentHashrate", "Total Valid Shares", "Avg Valid invalidShares", "Total Valid invalidShares", "Avg Valid staleShares", "Total staleShares", processed) ' +
                    'SELECT "Martian" as "Martian", worker, "Payout Avg currentHashrate"  as "Mining Period Hashrate", "Time Available", "Period Shares", "Period Pool Total Shares", "My Period Share", "Avg Valid Shares", "Pool Period Mined Amount", "PayOutID", "Successful Pulse", ' +
                    '"Total Pulse", "Avg Valid reportedHashrate", "Total Valid currentHashrate", "Total Valid Shares", "Avg Valid invalidShares", "Total Valid invalidShares", "Avg Valid staleShares", "Total staleShares", "processed" ' +
                    'FROM "MinerData"."api_PayoutOracleWithShares" ' +
                    'Where "processed"=false and "PayOutID" = 9999999999999 order by "Successful Pulse" desc, Cast("Avg Valid reportedHashrate" as decimal) desc; ' + 
                    'COMMIT TRANSACTION;'
                )        
                
                             
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
