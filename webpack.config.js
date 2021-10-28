const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var RemWebpackPlugin = require('./index.js');

module.exports = {
    mode:"production",
    entry:"./example/src/index.js",
    output:{
        path: path.resolve(__dirname, "dist")
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./example/src/index.html"
        }),
        new RemWebpackPlugin()
    ]
}