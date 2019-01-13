let path = require('path'); //绝对路径引入path模块;
let htmlWebpackPlugin = require('html-webpack-plugin'); //这是打包html文件的一个方法;
let cleanWebpackPlugin = require('clean-webpack-plugin');
let webpack = require('webpack'); //webpack 自带插件;
module.exports = {
    //entry可以写成数组,可以将没关联的两个js文件打包到一个js文件里
    //如:entry:['./src/index.js','./src/a.js]
    entry: './src/index.js', //入口;
    //多入口写法
    /* entry:{
        index:'./src/index.js',
        a:'./src/a.js'
    } */
    output: {
        // filename: 'build.js',
        //单页面
        filename: 'build.[hash:8].js', //添加一个哈希值  清缓存 8代表8位数,最长20好像
        /* //多页面
        filename: '[name].[hash:8].js', */

        path: __dirname + "/build"
            //       path: path.resolve('/build'); //解析出绝对路径;
    }, //出口;
    devServer: {
        contentBase: './build', //服务启动的根目录;
        port: 3000,
        compress: true, //服务压缩;
        open: true, //是否自动弹出浏览器
        hot: true, //热更新- 还需配置才能做到
    }, //开发服务器;
    module: {

        rules: [ //数组对象
            {
                test: /\.css$/,
                use: [{ //这样写,传参方便
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    }, //配置模块;
    //webpack插件 能够将引用的文件自动打包到文件夹中区;
    //
    plugins: [
        //该方法具体参数列表  参见 npm官网;
        new htmlWebpackPlugin({
            filename: 'index.html', //当入口是多入口时,又需引入不同的js文件,可以加此参数和chunks参数
            template: './src/index.html', //打包的模板文件
            title: 'myWebpack',
            hash: true, //哈希值 随机串  清缓存
            /* minify: { //压缩代码
                removeAttributeQuotes: true, //删除属性的双引号
                collapseWhitespace: true, //折叠空格
            } */
            //    chunks: ['index'], //引的什么js  就是什么js  一般要与filename参数连用
        }),
        /*  new htmlWebpackPlugin({
             filename: 'a.html', //当入口是多入口时,又需引入不同的js文件,可以加此参数和chunks参数
             template: './src/index.html', //打包的模板文件
             title: 'myWebpack',
             hash: true, //哈希值 随机串  清缓存
            //  minify: { //压缩代码
            //      removeAttributeQuotes: true, //删除属性的双引号
            //      collapseWhitespace: true, //折叠空格
            //  } 
             chunks: ['a']
         }), */
        new cleanWebpackPlugin(['./build']), //清空./build 文件夹;如果生产多个相同内容文件,就要清楚

        new webpack.HotModuleReplacementPlugin(), //webpack自带热更新插件
    ], //插件;
    mode: 'development', //开发模式;
    resolve: {}, //配置解析;
}