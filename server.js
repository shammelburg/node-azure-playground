const express = require('express')
const asyncWrapper = require('./asyncWrapper')
const checkPoolConnectionStatus = require('./checkPoolConnectionStatus')
const { sqlQuery, sqlStoredProcedure } = require('./data')
const app = express()

const { pool } = require('./config/mssql.connect')

app.get('/', asyncWrapper(async (req, res, next) => {
    checkPoolConnectionStatus(pool)
    const guid = '27e29e4e-9ac2-469f-8964-faa031bd2136'

    const qry = await sqlQuery(guid)
    const sp = await sqlStoredProcedure(guid)

    return res.status(200).json({ qry, sp })
}))

app.use((err, req, res, next) => {
    const error = {
        code: err.code,
        name: err.name,
        details: err.details,
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode
    }

    res.status(500).json(error)
})

const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}/`)
    checkPoolConnectionStatus(pool)
})


// On application cancel
process.on('SIGINT', async function () {
    console.log("Caught interrupt signal");

    if (pool.connected) {
        console.log('Closing SQL Server')
        await pool.close()
        checkPoolConnectionStatus(pool)
    }

    console.log('Closing Server')
    server.close((err) => console.log('HTTP Server Error: ', err))

    process.exit();
});

// On application closing
process.on('exit', async function () {
    console.log("On exit");

    if (pool.connected) {
        console.log('Closing SQL Server')
        await pool.close()
        checkPoolConnectionStatus(pool)
    }

    console.log('Closing Server')
    server.close((err) => console.log('HTTP Server Error: ', err))

    process.exit();
});