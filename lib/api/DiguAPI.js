var request = require('request');
var USER_TIMELINE_URL = "http://api.minicloud.com.cn/statuses/user_timeline.json";

function DiguAPI(user, password) {
    this.user = user;
    this.pass = password;
}
DiguAPI.prototype.user = '';
DiguAPI.prototype.pass = '';

DiguAPI.prototype.getUserTimeLine = function (userName, page ,callback) {
    request.get(USER_TIMELINE_URL + '?name=' + userName + '&page=' + page, {
        'auth': {
            'user':            'wptad',
            'pass':            'wpindows',
            'sendImmediately': true
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(null, body);
        }else{
            callback(error+ response.statusCode);
        }
    })
}

module.exports = DiguAPI;
