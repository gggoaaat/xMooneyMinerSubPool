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

exports.getLatestMiners = async function (req, res) {

    const handler = async (req, res) => {
        try {
            console.log("Query Call")
            const rows = await pool.query('SELECT "worker", "reportedHashrate", "currentHashrate", "validShares", "invalidShares", "staleShares", "entryDate" FROM "MinerData"."LatestWorkers"')
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

//exports.getLatestMiners({}, {})