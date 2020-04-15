var pkg = require("./package.json")
var path = require("path")
var rootPath = path.resolve(__dirname)
module.exports = {
    entry: {
        "localstore": rootPath + "/src/index.js"
    },
    mode:"production",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name]."+pkg.version+".js",
        library:"localstore",
        libraryTarget:"var"
    },
    resolve: {
        extensions: [".js", ".json"]
    }
}