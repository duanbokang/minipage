//引入模块
const http = require('http')
const fs = require('fs')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')
    //第一章url
const url = 'http://www.81zw.com/book/8634/745331.html'
    //开始章节数
let i = 1
    //最大获取章节数
let num = 100

function main(url) {
    startRequest(url)
}

function startRequest(url) {
    http.get(url, res => {
        //定义空数组存放html
        const html = []
        res.on('data', (chunk) => {
            //把数据块添加进数组
            html.push(chunk)
        })
        res.on('end', () => {
            //获取数据完毕后，使用iconv-lite转码，decedo中为Buffer对象，Buffer.concat为数组
            const html1 = iconv.decode(Buffer.concat(html), 'gbk')
                //使用cheerio解析html，cheerio模块的语法跟jQuery基本一样
            const $ = cheerio.load(html1, { decodeEntities: false })
                //处理数据
            const title = $('.bookname h1').text()
            const arr = []
            const content = $("#content").html()
                //分析结构后分割html
            const contentArr = content.split('<br><br>')
            contentArr.forEach(elem => {
                //去除内容的两端空格和&nbsp;
                const data = trim(elem.toString())
                arr.push(data)
            })
            const bookName = $(".con_top a").eq(2).text()
                //定义存入数据库的对象
            const obj = {
                id: i,
                err: 0,
                bookName: bookName,
                title: title,
                content: arr
            }

            let url2 = url.split('/')[url.split('/').length - 2]
            const link = $(".bottem2 a").eq(2).attr('href')
                //获取当前章节的下一章地址，递归调用fetchPage
            const nextLink = `http://www.81zw.com/book/${url2}/${link}`
            saveContent(obj, nextLink)
            console.log(`第${i + 1}章：${nextLink}`)
            i++
            if (i <= num) {
                setTimeout(() => {
                    main(nextLink)
                }, 100)
            }
        })
    })
}

function saveContent(obj, nextLink) {
    console.log(`${i}--${obj.title}`)
        //判断书名文件夹是否存在，不存在则创建
    if (!fs.existsSync(`data/${obj.bookName}`)) {
        fs.mkdirSync(`data/${obj.bookName}`)
    }
    //写入json文件
    fs.writeFile(`./data/${obj.bookName}/chapter${i}.json`, JSON.stringify(obj), 'utf-8', err => {
        if (err) throw err
    })
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '').replace(/&nbsp;/g, '')
}

main(url)