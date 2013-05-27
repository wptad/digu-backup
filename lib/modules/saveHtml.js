var ejs = require('ejs');
var fs = require('fs');
var filename = __dirname + '/../template/messages.html';
var messageTemplate = fs.readFileSync(filename, 'utf8');



function exportHtml(messageList){
    var html = ejs.render(messageTemplate, {
        messages:messageList
    });

    return html;
}

exports.exportHtml = exportHtml