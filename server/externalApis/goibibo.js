const express = require('express');
const router = express.Router();
const request = require("request")
    //---GOIBIBO REST API---

var seatMap = "http://developer.goibibo.com/api/bus/seatmap/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&skey=zaZ-IjMnmNI2zK59Gtq-EC5ZJw8645JJMJnl16JX-GoTy-wA3tkQsTPrjqmD7SezZlQsHuMwL7T4aIUuJ3c%3D";
var url = "http://developer.goibibo.com/api/bus/search/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&source=sivagangai&destination=coimbatore&dateofdeparture=20180215"
request({
        url: url,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var responseData = JSON.stringify(body);
            console.log("Resqestdss" + responseData) // Print the json response
        }
    })
    //---GOIBIBO REST API---