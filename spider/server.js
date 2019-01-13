const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio'); //获取dom对象,类似jq操作
const request = require('sync-request'); //同步请求
const iconv = require('iconv-lite'); //转码

var ofile = fs.openSync('三寸人间.txt', 'a');
let urlLen = "https://www.dianxs.com/book/73178/";
let len = request('GET', urlLen).getBody().toString();
let $ = cheerio.load(len);
let charpterLength = $(".section-list > dl>dd").length; //获取章节长度;


for (let i = 1; i < charpterLength; i++) {
    var url = `https://www.dianxs.com/book/73178/${1}.html`;
    var html = request('GET', url).getBody().toString();
    $ = cheerio.load(html); //获取到请求到的网页;
    let title = $(".main .read-title h2").text();
    title = `第${i}章-${title}`;
    let doc = $(".main .read-content").text();
    fs.writeSync(ofile, title, { 'flag': 'a' }, 'utf-8');
    fs.writeSync(ofile, doc, { 'flag': 'a' }, 'utf-8');
    console.log(`第${i}章写入中...`);
}


// fs.closeSync(ofile);
console.log('Done..');