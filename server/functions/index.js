const server = require('./server.js');

// Import function triggers from their respective submodules
const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");

setGlobalOptions({
    region:'europe-west1'
})

// Define the "api" function triggered by an HTTP request
exports.api = onRequest((req, res) => {
    server.emit('request', req, res);
});
