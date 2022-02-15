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
//const http = require('http');
const url = require('url');

exports.getPayouts = async function (req, res) {

    const handler = async (req, res) => {
        try {
            console.log("Query Call");

            const queryObject = url.parse(req.url, true).query;

            let runNothing = false;

            // shirt
            if (queryObject.RunIt == "1" && queryObject.Query != undefined) {
                switch (queryObject.Query) {
                    case "payouts":
                        const rows = await pool.query('SELECT "PayOutID", "SnapTime", "Algo", "Start Block", ' +
                            '"End Block", amount, "paidPrevious", "paidOn", "Mined From", "Mined To", ' +
                            '"PayOutProcessed", "PayOutDate", "EthRatioAtPayout", "OneEthToMooney", "EthRatioToBNB", "OneEthToBNB", "txHash" ' +
                            'FROM "MinerData"."api_PayoutDates" where "PayOutProcessed" = true Order by "PayOutID" desc');
                        console.log(rows);
                        res.send(rows);
                        break;
                    case "pending rewards":
                        const rowsAA = await pool.query('SELECT "PayOutID", "SnapTime", "Algo", "Start Block", ' +
                            '"End Block", amount, "paidPrevious", "paidOn", "Mined From", "Mined To", ' +
                            '"PayOutProcessed", "PayOutDate", "EthRatioAtPayout", "OneEthToMooney", "EthRatioToBNB", "OneEthToBNB", "txHash" ' +
                            'FROM "MinerData"."api_PayoutDates" where "PayOutProcessed" = false and "PayOutID" < 9999999999999 Order by "PayOutID" desc');
                        console.log(rowsAA);
                        res.send(rowsAA);
                        break;
                    case "miner payouts":
                        if (queryObject.PayOutID != undefined && !isNaN(queryObject.PayOutID)) {
                            const rows1 = await pool.query('SELECT * FROM "MinerData"."TempPayout_Archive" where "PayOutID" = $1  Order by "PayOutID" desc, "Martian" asc', [queryObject.PayOutID]);
                            console.log(rows1);
                            res.send(rows1);
                        }
                        else {
                            runNothing = true;
                        }
                        break;
                    case "pending miner rewards":
                        if (queryObject.PayOutID != undefined && !isNaN(queryObject.PayOutID)) {
                            const rows1aa = await pool.query('SELECT * FROM "MinerData"."TempPayout" where "PayOutID" = $1  Order by "PayOutID" desc, "Martian" asc', [queryObject.PayOutID]);
                            console.log(rows1aa);
                            res.send(rows1aa);
                        }
                        else {
                            runNothing = true;
                        }
                        break;
                    case "cached payouts":
                        if (queryObject.PayOutID != undefined && !isNaN(queryObject.PayOutID)) {
                            const rows1a = await pool.query('SELECT * FROM "MinerData"."Cache_Payout" where "PayOutID" = $1  Order by "PayOutID" desc', [queryObject.PayOutID]);
                            console.log(rows1a);
                            res.send(rows1a);
                        }
                        else {
                            runNothing = true;
                        }
                        break;
                    case "current miner payouts":
                        //'SELECT "Martian" as "Martian", "Miner", worker, "Payout Avg currentHashrate"  as "Mining Period Hashrate", "Time Available", "Period Shares", "Period Pool Total Shares", "My Period Share", "Avg Valid Shares", "Pool Period Mined Amount", "PayOutID", "Successful Pulse", "Total Pulse", "Avg Valid reportedHashrate", "Total Valid currentHashrate", "Total Valid Shares", "Avg Valid invalidShares", "Total Valid invalidShares", "Avg Valid staleShares", "Total staleShares" FROM "MinerData"."api_PayoutOracleWithShares" Where "PayOutID" = $1 order by "Martian"', ['9999999999999']);
                        const rows2 = await pool.query('SELECT "Martian", worker, "Mining Period Hashrate", "Time Available", "Period Shares", "Period Pool Total Shares", "My Period Share", "Avg Valid Shares", "Pool Period Mined Amount", "PayOutID", "Successful Pulse", "Total Pulse", "Avg Valid reportedHashrate", "Total Valid currentHashrate", "Total Valid Shares", "Avg Valid invalidShares", "Total Valid invalidShares", "Avg Valid staleShares", "Total staleShares", processed FROM "MinerData"."TempActive";');
                        console.log(rows2);
                        res.send(rows2);
                        break;                    
                    case "vote":
                        const rows3 = await pool.query('SELECT count(*), Sum("Votes") "Votes", "Option" 	FROM "Voting"."VoteTally" group by "Option"');
                        console.log(rows3);
                        res.send(rows3);
                        break;
                    case "votes":
                        const rows4 = await pool.query('SELECT "ID", "WalletAddress", "Votes", "Option", "ParentBallotID", "SnapTime" FROM "Voting"."VoteTally" where "Votes" > 0 order by "Votes" desc');
                        console.log(rows4);
                        res.send(rows4);
                        break;
                    case "martians" : 
                        const rows5 = await pool.query('SELECT "Martian", "Worker", "WalletAddress", "StartDate" FROM "MinerData"."MappedMartians"');
                        console.log(rows5);
                        res.send(rows5);
                        break;
                     case "circulation" : 
                        const rows6 = await pool.query('SELECT "ID", "Data", "Circulating", "NotCirculating", "CirculatingPercent", "NotCirculatingPercent", "SnapTime" FROM "Stats"."TokenCirculation" order by "ID" desc limit 1');
                        console.log(rows6);
                        res.send(rows6);
                        break;
                    default:
                        runNothing = true;
                        break;
                }
            }
            else {
                runNothing = true;
            }

            if (runNothing) {
                const rows = [{ "Nothing": "Here" }];
                console.log(rows);
                res.send(rows);
            }

            console.log(queryObject);

        } catch (e) {
            console.log('failed', e);
        }

        return true;
    }

    handler(req, res);

    return true;
}

//exports.getLatestMiners({}, {})