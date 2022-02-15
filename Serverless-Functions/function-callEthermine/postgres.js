const { Pool } = require('pg')
const dbConfig = {
    user: 'mooney',
    host: 'googleCloudHostLocation',
    database: 'Miners',
    password: process.env.xMooneyDB,
    port: 5432
}

const pool = new Pool(dbConfig)

module.exports = pool;
