var DiguAPI = require('./api/DiguAPI');
var CONFIG = require('../config/config');
var async = require('async')
var diguAPI = new DiguAPI(CONFIG.USER, CONFIG.PASSWORD);
var fs = require('fs');
function GetPageContent(user, page, callback) {
    diguAPI.getUserTimeLine(user, page, function (err, resultStr) {

        if(err){
            callback('err'+err);
            return;
        }
        var result = JSON.parse(resultStr);
        if (Array.isArray(result)) {
            var content = '';
            result.forEach(function (item) {
                var dateStr = item.created_at;
                var text = item.text;
                content += dateStr + '\t' + text + '\n';
            })
            callback(null, content);
        } else if (result.wrong) {
            callback('finished');
        } else {
            callback('unknown error: ')
        }
    })
}

if (!module.parent) {

    var user = CONFIG.USER_TO_SAVE;
    var page = 1;
    var str = ''
    var nextPage = true;

    async.whilst(
        function () {
            return nextPage;
        },
        function (finish) {
            GetPageContent(user, page, function (err, result) {
                console.log('go to page: ' + page);
                page++;
                str += result;
                if (err) {
                    nextPage = false;
                }
                finish();
            });
        },
        function (err) {
            console.log('finished');
            fs.writeFile(__dirname +'/../data/data.txt', str, function (err) {
                if (err) throw err;
                console.log('data saved!');
            });
        }
    );
}