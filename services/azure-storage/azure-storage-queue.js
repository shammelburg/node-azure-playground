const { accountName, accountKey, containerName } = require('../../config/azure-storage.config')
const { QueueServiceClient, StorageSharedKeyCredential } = require("@azure/storage-queue");

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)

const queueServiceClient = new QueueServiceClient(
    `https://${accountName}.queue.core.windows.net`,
    sharedKeyCredential
);

const getQueueClient = async (queueName) => {
    const client = queueServiceClient.getQueueClient(queueName)
    await client.createIfNotExists()
    return client
}

module.exports = {
    listQueues: async () => {
        let queueList = queueServiceClient.listQueues();
        let i = 1;
        let queueListNames = []
        for await (const queue of queueList) {
            console.log(`Queue${i}: ${queue.name}`);
            queueListNames.push({ number: i, name: queue.name })
            i++;
        }

        return queueListNames
    },
    /** Use QueueServiceClient.getQueueClient() function to create a new queue. */
    createQueue: async (queueName) => {
        const queueClient = await getQueueClient(queueName);
        const { requestId } = await queueClient.create();
        console.log(
            `Created queue ${queueName} successfully, service assigned request Id: ${requestId}`
        );
        return requestId
    },
    /** Use sendMessage() to add a message to the queue - JSON.stringify*/
    sendMessage: async (queueName, message) => {
        const queueClient = await getQueueClient(queueName);
        const { messageId, requestId } = await queueClient.sendMessage(message);
        console.log(
            `Sent message successfully, service assigned message Id: ${messageId}, service assigned request Id: ${requestId}`
        );
        return [messageId, requestId]
    },
    /** QueueClient.peekMessages() allows looking at one or more messages in front of the queue. This call doesn't prevent other code from accessing peeked messages. */
    peekMessage: async (queueName) => {
        const queueClient = await getQueueClient(queueName);
        const { peekedMessageItems } = await queueClient.peekMessages();
        console.log(`The peeked message is: ${peekedMessageItems[0].messageText}`);
        return peekedMessageItems[0].messageText
    },
    /** 
     * JSON.parse
     * 
     * Messages are processed in two steps.

       * First call queueClient.receiveMessages(). This makes the messages invisible to other code reading messages from this queue for a default period of 30 seconds.
       * When processing of a message is done, call queueClient.deleteMessage() with the message's popReceipt.
       
       If your code fails to process a message due to hardware or software failure, this two-step process ensures that another instance of your code can get the same message and try again.
     */
    processMessages: async (queueName) => {
        const queueClient = await getQueueClient(queueName);
        const { receivedMessageItems } = await queueClient.receiveMessages();

        if (receivedMessageItems.length == 1) {
            const receivedMessageItem = receivedMessageItems[0];
            console.log(`Processing & deleting message with content: ${receivedMessageItem.messageText}`);

            const { requestId } = await queueClient.deleteMessage(
                receivedMessageItem.messageId,
                receivedMessageItem.popReceipt
            );
            console.log(
                `Delete message successfully, service assigned request Id: ${requestId}`
            );
        }

        return receivedMessageItems[0].messageText
    },
    /** Delete a queue */
    deleteQueue: async (queueName) => {
        const queueClient = await getQueueClient(queueName);
        const { requestId } = await queueClient.delete();
        console.log(
            `Deleted queue successfully, service assigned request Id: ${requestId}`
        );
        return requestId
    }
}