//function-getPrice
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
const UNISWAP = require('@uniswap/sdk')
console.log("The chainId of mainnet is ${UNISWAP.ChainId.MAINNET}.")
//const { ChainId, Token, WETH, Fetcher } = require('@uniswap/sdk')

exports.getVote = async function (req, res) {
    console.log("Start")

    const url = 'https://api.ethermine.org/miner/07B253040706B26920F47a8C82Fb245E6E230Dce/dashboard'

    const handler = async (req, res) => {
        const { rows } = await pool.query('SELECT count(*), Sum("Votes") "Votes", "Option" FROM "Voting"."VoteTally" group by "Option"'
        )

        res.send(rows);

        return true;
    }

    handler(req, res);

    return true;
}
