//function-getPrice
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

//const { Pool, Client } = require('pg');
const express = require('express');
const fetch = require('node-fetch')
const bodyParser = require("body-parser");
const cors = require('cors');
const { Pool } = require('pg')
const pool = require('./postgres')

exports.postThings = async function (req, res) {
    const req2 = req.body;

    //const req2 = { "Hi" : "Bye"}

    //app.use(express.json())

    //const url = 'https://api.ethermine.org/miner/07B253040706B26920F47a8C82Fb245E6E230Dce/dashboard'

    const whitelist = ['https://www.xmooney.com', 'https://www.xmooneytoken.com']

    console.log("Start dump");

    //console.log(request.body);

    var origin = req.get('origin');

    console.log("origin:" + origin)

    // const { rows } = await pool.query(
    //    'INSERT INTO "Voting"."Votes"("ParentBallotID", "Data", "WalletAddress") VALUES($1, $2, $3)',
    //   [1, req2, req2.address]
    //)  
    console.log(req2)

    if (origin == 'https://www.xmooney.com' && 1==2) {
        try {
            const { rows } = await pool.query('INSERT INTO "Voting"."Votes"("ParentBallotID", "WalletAddress", "Data") VALUES ($1, $2, $3)',
                [1, req2.address, req2]
            )

            const rows2 = await pool.query('INSERT INTO "Voting"."VoteTally"("WalletAddress", "Votes", "Option", "ParentBallotID")VALUES ($1, $2, $3, $4)',
                [req2.address, req2.trueAmount, req2.vote, 1]
            )

            result = { result: "success" }
        }
        catch
        {
            result = { result: "error" }
        }
        finally {

        }
    }
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'https://www.xmooney.com')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    //res.header('Access-Control-Allow-Origin', '*')
    res.send(result)

    return true;
}