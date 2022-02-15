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

exports.getCirculating = async function (req, res) {
    console.log("Start")

    const bscRequest = {
        contractaddress: "0x98631c69602083d04f83934576a53e2a133d482f",
        address: [
            "0xd7e40938ff20591488fdb2d55131a735c5475818",
            "0xd00f26915108df339bf9b63bd34a305052eefffb",
            "0x23698baf48bd51a2EB632960409318a37FF9E21b"
            //, "0xcb375202c52305c30fc5292d3343f648f730eea8"
        ],
        apikey: "8CAPXKFGDBTBV5V4413PJB6XAISTSHHERY"
    }

    const handler = async (req, res) => {
        try {
            console.log("Fetch Call")

            let balances = []

            for (let index = 0; index < bscRequest.address.length; index++) {
                const element = bscRequest.address[index];

                let balanceResult = await fetch("https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=" +
                    bscRequest.contractaddress + "&address=" + element + "&tag=latest&apikey=" + bscRequest.apikey)

                let thisBalance = await balanceResult.json()
                balances.push(+thisBalance.result)
            }

            const sumOfBalances = balances.reduce((a, b) => a + b, 0);

            const realNumber = 21000000000 - (sumOfBalances / 1000000000);

            const getCirculatingPercent = (realNumber / 21000000000);

            const notCirculating = 21000000000 - realNumber;

            const circulatingData = {
                circulating: realNumber,
                notCirculating: notCirculating,
                circulatingPercent: getCirculatingPercent,
                notCirculatingPercent: 1 - getCirculatingPercent
            }

            const { thisReturn } = await pool.query(
                'INSERT INTO "Stats"."TokenCirculation"("Data", "Circulating", "NotCirculating", "CirculatingPercent", "NotCirculatingPercent") ' +
                'VALUES ($1, $2, $3, $4, $5);',
                [circulatingData, circulatingData.circulating, circulatingData.notCirculating, circulatingData.circulatingPercent, circulatingData.notCirculatingPercent]
            )

            res.send(circulatingData)
        } catch (e) {
            console.log('failed', e)
        }

        return true;
    }

    handler(req, res);

    return true;
}