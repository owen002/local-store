var pkg = require("./package.json")
var path = require("path")
var rootPath = path.resolve(__dirname)
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: {
        "localstore": rootPath + "/src/index.js",
        "localstore.min": rootPath + "/src/index.js"
    },
    mode:"none",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].js",
        library:"localstore",
        libraryExport:'default',
        libraryTarget:"var"
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ // 使用压缩插件
                include: /\.min\.js$/
            })
        ]
    },
    resolve: {
        extensions: [".js", ".json"]
    }
}