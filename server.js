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

//---GOIBIBO REST API---

var seatMap = "http://developer.goibibo.com/api/bus/seatmap/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&skey=zaZ-IjMnmNI2zK59Gtq-EC5ZJw8645JJMJnl16JX-GoTy-wA3tkQsTPrjqmD7SezZlQsHuMwL7T4aIUuJ3c%3D";
var url = "http://developer.goibibo.com/api/bus/search/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&source=sivagangai&destination=coimbatore&dateofdeparture=20180215"
request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var responseData = JSON.stringify(body);
            console.log("Resqest" + responseData) // Print the json response
        }
    })
    //---GOIBIBO REST API---


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
const port = process.env.PORT || '8096';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));