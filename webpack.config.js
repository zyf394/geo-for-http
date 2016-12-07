var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
module.exports = {
    entry: {
        index: "./test/js/index.js"
    },
    output: {
        path: "./dist/",
        filename: "js/[name].js",
        chunkFilename: "js/[name].js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/, 
                loader: "eslint-loader", 
                exclude: /node_modules|lib/
            }
        ],
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                // use in html：var imgstr = require("./imgs/3.png");
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=5012&name=./static/images/[name]_[hash].[ext]'
                    // 'image-webpack?{bypassOnDebug:true, progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(ejs|tpl|tmpl)$/,
                loader: 'ejs'
            },
            {
                // 编译es6
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'title',
            template: './test/index.html', 
            filename: './index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ["index"]
        })
    ]
};
