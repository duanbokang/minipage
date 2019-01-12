const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); //获取dom对象,类似jq操作
const request = require('sync-request'); //同步请求
const iconv = require('iconv-lite'); //转码

var ofile = fs.openSync('bb.txt', 'a');
for (let i = 1; i < 1139; i++) {
    var url = `https://www.dianxs.com/book/96720/${i}.html`;
    var html = request('GET', url).getBody().toString();
    let $ = cheerio.load(html); //获取到请求到的网页;
    let title = $(".main .read-title h2").text();
    let doc = $(".main .read-content").text();
    fs.writeSync(ofile, title, { 'flag': 'a' }, 'utf-8');
    fs.writeSync(ofile, doc, { 'flag': 'a' }, 'utf-8');
}


fs.closeSync(ofile);
console.log('Done..');