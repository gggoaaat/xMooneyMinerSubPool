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

exports.getTokenReleaseSchedule = async function (req, res) {

    const handler = async (req, res) => {
        try {
            console.log("Query Call");

            const queryObject = url.parse(req.url, true).query;

            let runNothing = false;
            
            const rows = await pool.query('SELECT "CycleDate", "CiculatingSupply" FROM "MinerData"."Tokens Release";');
            console.log(rows);
            res.send(rows.rows);                

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