module.exports = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000
    },
    options: {
        encrypt: process.env.SQL_ENCRYPT === '1', 
        enableArithAbort: true
    }
}
