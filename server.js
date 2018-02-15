// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const config = require('./config');

// Get our API routes
const api = require('./server/routes/api');
const app = express();
const request = require("request")

// Mongo Connect
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://" + config.db.host + "/" + config.db.port, { useMongoClient: true })
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.error("MongoDb hasn't connected", err));




// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8095';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));