const { subscriptionKey } = require('../../config/azure-cognitive.config')
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
const location = "Global";

module.exports = {
    /** Returns an array of translations */
    translateText: async (text, to = ['de', 'it'], from = 'en') => {
        const { data } = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': subscriptionKey,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: { 'api-version': '3.0', 'from': from, 'to': to },
            data: [{ 'text': text }],
            responseType: 'json'
        })

        console.log(JSON.stringify(data, null, 4));

        return data[0].translations
    }
}


