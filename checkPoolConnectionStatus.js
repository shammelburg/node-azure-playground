const chalk = require('chalk')

module.exports = (pool) => console.log(`SQL Connection Pool: ${pool.connected ? chalk.green('Connected') : chalk.red('Disconnected')}`)