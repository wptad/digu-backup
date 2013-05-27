var ejs = require('ejs');
var fs = require('fs');
var filename = __dirname + '/template/ad.html';
var messageTemplate = fs.readFileSync(filename, 'utf8');



function exportHtml(){
    var html = ejs.render(adTemplate, {
        ads:JSON.stringify(ads),
        blocks:blocks,
        popUrl:popUrl,
        isPage:isPage,
        styleStr: styleStr,
        popTimeout:popTimeout,
        adDomain:settings.AD_SERVER_DOMAIN
    });
}
