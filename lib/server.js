var DiguAPI = require('./api/DiguAPI');
var CONFIG = require('../config/config');
var async = require('async')
var diguAPI = new DiguAPI(CONFIG.USER, CONFIG.PASSWORD);
var fs = require('fs');
var saveHtml = require('./modules/saveHtml');
function GetPageContent(user, page, callback) {
    diguAPI.getUserTimeLine(user, page, function (err, resultStr) {

        if(err){
            callback('err'+err);
            return;
        }
        var result = JSON.parse(resultStr);
        if (Array.isArray(result)) {
            var content = '';
            var resultList = [];
            result.forEach(function (item) {
                var dateStr = item.created_at;
                var text = item.text;
                var pics = item.picPath;
                for (var key in pics) {
                    var removedStr = pics[key].match(/_[0-9]*x[0-9]*/)[0];
                    pics[key] = pics[key].replace(removedStr, '');
                }
                var message = {
                    text:text,
                    date:dateStr,
                    pics:pics
                };
                resultList.push(message);

                content += dateStr + '\t' + text + '\n';
            })
            callback(null, content , resultList);
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

    var messageList = [];
    async.whilst(
        function () {
            return nextPage;
        },
        function (finish) {
            GetPageContent(user, page, function (err, result,resultList) {
                console.log('go to page: ' + page);
                page++;
                str += result;
                if(resultList){
                    messageList = messageList.concat(resultList);

                }
                if (err) {
                    nextPage = false;
                }
                finish();
            });
        },
        function (err) {
            console.log('finished');
            console.log(messageList)

            var html = saveHtml.exportHtml(messageList)
            fs.writeFile(__dirname +'/../data/data.html', html, function (err) {
                if (err) throw err;
                console.log('data saved!');
            });
        }
    );
}