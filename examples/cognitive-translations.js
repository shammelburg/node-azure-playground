const chalk = require('chalk');
const { translateText } = require('../services/azure-cognitive/azure-cognitive-translate');

const executeAsyncCode = async () => {
    const translatedText = await translateText('Hello world!', ['nl'])
    console.log(translatedText)
}

(async () => {
    try {
        await executeAsyncCode()
    } catch (error) {
        console.error(chalk.red(error.message));
    }
})()
