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

exports.getMinerPayStats = async function (req, res) {
    console.log("Start")

    const url = 'https://api.ethermine.org/miner/07B253040706B26920F47a8C82Fb245E6E230Dce/dashboard'

    const handler = async (req, res) => {
        // const { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } = require('@uniswap/sdk');
        // console.log("Get Token");
        // const Mooney = new Token(ChainId.MAINNET, '0x80ba768f7e1bfbe659d8c3c96d44126b22a853df', 18);
        // // const USDT = new Token(ChainId.MAINNET, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6);

        // // note that you may want/need to handle this async code differently,
        // // for example if top-level await is not an option
        // console.log("Get Pair")
        // const pair = await Fetcher.fetchPairData(Mooney, WETH[Mooney.chainId])
        // //const pair2 = await Fetcher.fetchPairData(Mooney, WETH[USDT.chainId])
        
        // console.log("Get Route")
        // const route = new Route([pair], WETH[Mooney.chainId])
        // //const route2 = new Route([pair2], WETH[USDT.chainId])

        // console.log("Get Trade")
        // const trade = new Trade(route, new TokenAmount(WETH[Mooney.chainId], '1000000000000000000'), TradeType.EXACT_INPUT)
        // //const trade2 = new Trade(route2, new TokenAmount(WETH[USDT.chainId], '1000000'), TradeType.EXACT_INPUT)

        // console.log(trade.executionPrice.toSignificant(6))
        // console.log(trade.nextMidPrice.toSignificant(6))
        // //console.log(trade2.executionPrice.toSignificant(6))
        // //console.log(trade2.nextMidPrice.toSignificant(6))
        res.send({
            //executionPrice: trade.executionPrice.toSignificant(8),
            //nextMidPrice: trade.nextMidPrice.toSignificant(8),
            secret: process.env.xMooneyBotStuff
        });

        return true;
    }

    handler(req, res);

    return true;
}
