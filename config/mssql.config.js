module.exports = {
    user: '',
    password: '',
    server: '',
    database: '',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 10000
    },
    options: {
        encrypt: false, // Set to true if you're using Azure SQL Database
        enableArithAbort: true
    }
}
