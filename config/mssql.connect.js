const sql = require('mssql')
const config = require('./mssql.config')

/**
 * https://tediousjs.github.io/node-mssql/#connection-pools
 * 
 * Using a single connection pool for your application/service is recommended. Instantiating a pool with a callback, 
 * or immediately calling .connect, is asynchronous to ensure a connection can be established before returning. 
 * From that point, you're able to acquire connections as normal.
 * 
 * Awaiting or .thening the pool creation is a safe way to ensure that the pool is always ready, 
 * without knowing where it is needed first. In practice, once the pool is created then there will be 
 * no delay for the next operation.
 *
 * As of v6.1.0 you can make repeat calls to ConnectionPool.connect() and ConnectonPool.close() without an error being thrown, 
 * allowing for the safe use of mssql.connect().then(...) throughout your code as well as making multiple calls to 
 * close when your application is shutting down.
 *
 * The ability to call connect() repeatedly is intended to make pool management easier, 
 * however it is still recommended to follow the example above where connect() is called once and using the original 
 * resolved connection promise. Repeatedly calling connect() when running queries risks running into problems when 
 * close() is called on the pool.
 */
const pool = new sql.ConnectionPool(config)

/** Ensures that the pool has been created */
const poolPromise = pool.connect()

// Dispatched on connection error.
pool.on('error', err => {
    console.log(`--------- MSSQL Error: Start`)
    console.log(err)
    console.log(`--------- MSSQL Error: End`)
})

module.exports = { sql, pool, poolPromise }