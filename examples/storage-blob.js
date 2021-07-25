const chalk = require('chalk')
const azureBlob = require('../services/azure-storage/azure-storage-blob')


const executeAsyncCode = async () => {
    const blobRef = 'nodejs.png'

    // Insert image from URL
    const src = 'https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_f0b606abb6d19089febc9faeeba5bc05/nodejs-development-services.png'

    const { requestId } = await azureBlob.syncCopyFromURL(src, blobRef)
    console.log(requestId)


    // Delete blob
    // const { succeeded, requestId } = await azureBlob.delete(blobRef)
    // console.log(succeeded, requestId)


    // Delete container
    // const { succeeded } = await azureBlob.deleteContainer()
    // console.log(succeeded)
}

(async () => {
    try {
        await executeAsyncCode()
    } catch (error) {
        console.error(chalk.red(error.message));
    }
})()