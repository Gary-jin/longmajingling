const klawSync = require('klaw-sync')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Collect the page's names
const pages = {}
const vues = klawSync('./src/pages', {
    nodir: true, traverseAll: true, filter(file) {
        return path.extname(file.path) === '.vue'
    }
})

const pagesIndex = path.resolve(__dirname, 'src/pages').length;

vues.map(vue => {
    let filename
    if (process.platform !== 'win32') {
        filename = vue.path.substring(pagesIndex + 1).replace(/\.vue$/, '.html').replace(/\//g, '-')
    } else {
        filename = vue.path.substring(pagesIndex + 1).replace(/\.vue$/, '.html').replace(/\\/g, '-')
    }
    const page = filename.substring(0, filename.lastIndexOf("."))

    pages[page] = {
        entry: vue.path,
        template: './public/page.ejs',
        filename,
        chunks: [page, 'runtime'],
        name: page,
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }
    }
})

module.exports = {
    pages,
    publicPath: './',
    filenameHashing: false,
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        writeToDisk: file => {
            return /index.html$/.test(file) || /config.xml$/.test(file)
        },
        proxy: {
            '/api': {    // search为转发路径
                target: 'http://taoqimao.vmall99.com',  // 目标地址
                ws: true, // 是否代理websockets
                changeOrigin: true   // 设置同源  默认false，是否需要改变原始主机头为目标URL,
            }
        }
    },
    configureWebpack: {
        output: {
            library: "pageVue",
            libraryTarget: "window",
            libraryExport: 'default'
        },
        optimization: {
            runtimeChunk: {
                name: "runtime"
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                chunks: [],
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true
                }
            })
        ],
        externals: {
            vue: 'Vue'
        }
    },
    chainWebpack(config) {
        config.optimization.splitChunks(undefined);

        config.plugin('copy')
            .tap(args => {
                args[0][0].ignore.push(process.env.NODE_ENV === 'development' ? 'vue.min.js' : 'vue.js')
                return args
            })


        config.resolve.symlinks(true);/*热更新问题*/
    }
}