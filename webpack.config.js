var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/js/index.js"
    },
    output: {
        path: "./dist/",
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                // 在页面中加载图片示例：var imgstr = require("./imgs/3.png");
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=5012&name=./imgs/[name]_[hash].[ext]'
                    // 'image-webpack?{bypassOnDebug:true, progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '标题标题',
            template: './src/index.html', // 源模板文件
            filename: './index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ["index"]
        })
    ]
};
