const config = require('../../config');
var request = require('request');
//---GOIBIBO REST API---
var seatMap = "http://developer.goibibo.com/api/bus/seatmap/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&skey=zaZ-IjMnmNI2zK59Gtq-EC5ZJw8645JJMJnl16JX-GoTy-wA3tkQsTPrjqmD7SezZlQsHuMwL7T4aIUuJ3c%3D";
// var url = "http://developer.goibibo.com/api/bus/search/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&source=sivagangai&destination=coimbatore&dateofdeparture=20180215"

var goibibo = function() {
    var _searchBus = function(searchBusQuery, cb) {
        console.log(searchBusQuery);
        var from = searchBusQuery.from;
        var to = searchBusQuery.to;
        var departDate = searchBusQuery.departDate;
        var url = 'http://developer.goibibo.com/api/bus/search/?app_id=890d252b&app_key=b9a41baeb1ebeaad95945de38854c32f&format=json&source=' + from + '&destination=' + to + '&dateofdeparture=20180215' + departDate;
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var responseData = {};
                if (body.data) {
                    var responseData = body.data;
                }
                cb(null, responseData);
            } else {
                cb(error);
            }
        })
    };

    return {
        searchBus: _searchBus
    }
}();

module.exports = goibibo;