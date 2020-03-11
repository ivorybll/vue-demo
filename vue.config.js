'use strict'
const path = require('path')
const webpack = require('webpack')

const devProxy=['/api','/weixin','ios',...];//代理
var proEnv = require('./config/pro.env'); // 生产环境
var uatEnv = require('./config/uat.env'); // 测试环境
var devEnv = require('./config/dev.env'); // 本地环境
let target=""
<!-- 默认是本地环境 -->
if(env==='production'){
<!-- 生产环境 -->
target=proEnv.hosturl
}
else if(env==='test'){
target=uatEnv.hosturl
}
else{
target=devEnv.hosturl
}
<!-- 生成代理配置对象 -->
let proxyObj={};
devProxy.forEach((value,index)=>{
proxyObj[value]={
target:target,
changeOrigin:true,
pathRewrite:{
[`^${value}`]: value
}
}
})
console.log(proxyObj)
function resolve(dir) {
return path.join(__dirname, dir)
}

const name = 'demo' // 页面标题

module.exports = {
/**
* 如果计划在子路径下部署站点，则需要设置publicPath，
* 例如GitHub页面。如果您计划将您的站点部署到https://foo.github.io/bar/，
* 那么将publicPath设置为"/bar/"。
* 在大多数情况下，请使用'/'！
* Detail: https://cli.vuejs.org/config/#publicpath
*/
publicPath: '/',
outputDir: 'dist',
assetsDir: 'static',
lintOnSave: process.env.NODE_ENV === 'development',
productionSourceMap: false, // 使得打包过后的文件不包含未压缩的.map文件，减少压缩后代码体积
configureWebpack: {
// 在webpack的name字段中提供应用程序的标题，
// 可以在index.html中访问它以注入正确的标题。
name: name
},

// 允许对内部的webpack配置进行更细粒度的修改
chainWebpack(config) {
config.plugins.delete('preload') // 移除 preload 插件
config.plugins.delete('prefetch') // 移除 prefetch 插件

// 配置目录别名
config.resolve.alias
.set('styles', resolve('src/styles'))
.set('common', resolve('src/common'))
.set('api', resolve('src/api'))

config
.plugin('context')
.use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])

// 设置 svg-sprite-loader
config.module
.rule('svg')
.exclude.add(resolve('src/icons'))
.end()
config.module
.rule('icons')
.test(/\.svg$/)
.include.add(resolve('src/icons'))
.end()
.use('svg-sprite-loader')
.loader('svg-sprite-loader')
.options({
symbolId: 'icon-[name]'
})
.end()

// 为了补删除换行而加的配置
config.module
.rule('vue')
.use('vue-loader')
.loader('vue-loader')
.tap(options => {
options.compilerOptions.preserveWhitespace = true
return options
})
.end()

// 开发环境添加source map
config
.when(process.env.NODE_ENV === 'development',
config => config.devtool('cheap-source-map')
)
}
}
