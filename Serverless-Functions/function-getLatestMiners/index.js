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

exports.getMinerPayStats = async function (req, res) {
    console.log("Start")

    const url = 'https://api.ethermine.org/miner/07B253040706B26920F47a8C82Fb245E6E230Dce/dashboard'

    const handler = async (req, res) => {
        try {            

            const queryData = await pool.query('SELECT ' +
                '"paidOn", "paidOn Date", "worker", "Average Shares", "Presence Count", "First Ping", ' +
                '"Last Ping", "First Epic", "Last Epic", "Pool Eth", "Total Shares for Period", "Percent Contribution", "Payout due in Eth"' +
                'FROM "MinerData"."WorkersWithPayoutDue"')

            res.send(queryData);
        } catch (e) {
            console.log('failed', e);
            res.send({ result : "Failed", error : e});
        }
       
        return true;
    }

    handler(req, res);

    return true;
}
