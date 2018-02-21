const config = require('../../config');
var request = require('request');
var seatMap = config.goibibo.url + "bus/seatmap/?app_id=" + config.goibibo.app_id + "&app_key=" + config.goibibo.app_key + "&format=json&skey=" + config.goibibo.skey;

var goibibo = function () {
    var _searchBus = function (searchBusQuery, cb) {
        var from = searchBusQuery.from;
        var to = searchBusQuery.to;
        var departDate = searchBusQuery.formatDepartDate;
        var searchBusApiUrl = config.goibibo.url + "bus/search/?app_id=" + config.goibibo.app_id + "&app_key=" + config.goibibo.app_key + "&format=json&source=" + from + "&destination=" + to + "&dateofdeparture=" + departDate;
        request({
            url: searchBusApiUrl,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var responseData = {};
                if (body.data) {
                    var responseData = body.data;
                }
                cb(null, responseData);
            } else {
                cb(error);
            }
        });
    };

    return {
        searchBus: _searchBus
    }
}();

module.exports = goibibo;