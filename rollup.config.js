import path from "path"
import nodeResolve from 'rollup-plugin-node-resolve' // 帮助寻找node_modules里的
import commonjs from 'rollup-plugin-commonjs'   // 将非ES6语法的包转为ES6可用
// import babel from 'rollup-plugin-babel'                             // rollup 的 babel 插件，ES6转ES5
// import replace from 'rollup-plugin-replace'                       // 替换待打包文件里的一些变量，如 process在浏览器端是不存在的，需要被替换
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV
const rootPath = path.resolve(__dirname)

let config = {
    input: rootPath + "/src/index.js",
    external: [],
    format: "umd",
    output: {
        file: "./dist/localstore.js",
        format: "esm",
        name: "localstore"
    },
    plugins: [
        nodeResolve(),
        // babel({
        //     exclude: '**/node_modules/**'
        // }),
        // replace({
        //     'process.env.NODE_ENV': JSON.stringify(env)
        // }),
        commonjs()
    ]
}

// if (env === 'production') {
    config.plugins.push(
        uglify({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    )
// }

export default config