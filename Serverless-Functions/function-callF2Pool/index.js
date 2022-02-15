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

exports.getF2Pool = async function (req, res) {
    console.log("Start")

    //const url = 'https://api.f2pool.com/bitcoin/techoshi'
    const url = 'https://www.f2pool.com/mining-user/674ce121b3dfee9b7b76187f5158f193'

    const handler = async (req, res) => {
        try {
            const querystring = require("querystring");
            const { Curl } = require("node-libcurl");

            const curl = new Curl();
            //const terminate = curl.close.bind(curl);

            curl.setOpt(Curl.option.SSL_VERIFYPEER, 0);
            curl.setOpt(
                "URL",
                url
              );
            //curlTest.setOpt(Curl.option.GET, true);

            curl.on("end", function (statusCode, data, headers) {
                console.log(data)

                console.log("Status code " + statusCode);
                console.log("***");
                console.log("Our response: " + data);
                console.log("***");
                console.log("Length: " + data.length);
                console.log("***");
                console.log("Total time taken: " + this.getInfo("TOTAL_TIME"));

                this.close();
            });
            curl.on("error", curl.close.bind(curl));
            curl.perform();
           // console.log(something)            

            res.send({ result : "Data Fetched"})
        } catch (e) {
            console.log('failed', e)
        }

        return true;
    }

    handler(req, res);

    return true;
}
