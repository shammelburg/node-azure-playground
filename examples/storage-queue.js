
const chalk = require('chalk')
const azureQueue = require('../services/azure-storage/azure-storage-queue')


const executeAsyncCode = async () => {
    const queueName = 'my-queue'

    // Send message to queue
    const message = JSON.stringify({
        isThis: 'JSON',
        date: new Date().toDateString()
    })
    await azureQueue.sendMessage(queueName, message)

    // Process first message in queue
    // const message = await azureQueue.processMessages(queueName)
    // console.log(JSON.parse(message))


    // Delete queue
    // await azureQueue.deleteQueue(queueName)
}

(async () => {
    try {
        await executeAsyncCode()
    } catch (error) {
        console.error(chalk.red(error.message));
    }
})()
