const chalk = require('chalk');
const { sqlQuery, sqlStoredProcedure } = require('../data/data')
const { sql, pool, poolPromise } = require('../config/mssql.connect');
const checkPoolConnectionStatus = require('../checkPoolConnectionStatus')

const executeAsyncCode = async () => {
    checkPoolConnectionStatus(pool)
    await poolPromise;
    checkPoolConnectionStatus(pool)

    const guid = '27e29e4e-9ac2-469f-8964-faa031bd2136'

    const qry = await sqlQuery(guid)
    console.log(qry)
    const sp = await sqlStoredProcedure(guid)
    console.log(sp)


    // Uncomment to close connection when finished, otherwise the app will close when idle time has expired.
    await pool.close()
}

(async () => {
    try {
        await executeAsyncCode()
    } catch (error) {
        console.error('SQL error', chalk.red(error.message));
    }
})()



// On application cancel
process.on('SIGINT', async function () {
    console.log("Caught interrupt signal");
    if (pool.connected) {
        await pool.close()
        checkPoolConnectionStatus(pool)
    }
    process.exit();
});

// On application closing
process.on('exit', async function () {
    console.log("On exit");
    if (pool.connected) {
        await pool.close()
        checkPoolConnectionStatus(pool)
    }
    process.exit();
});