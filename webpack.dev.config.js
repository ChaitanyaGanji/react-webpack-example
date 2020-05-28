const path = require ('path')
const terserplugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
const minicssextractplugin = require('mini-css-extract-plugin')

module.exports = {
    entry : "./index.js",
    output : {
        filename : "bundle.js",
        path: path.resolve( __dirname , "./dist"),
        publicPath : ""
    },
    mode: "development",
    devServer: {
        contentBase : path.resolve( __dirname , "./dist"),
        index: 'index.html',
        port: 9000
    },
    module: {
        rules: [
            {
                test : /\.(jpg|png)$/,
                use : [
                    "file-loader"
                ]
            }, 
            {
                test : /\.(css)$/,
                use : [
                    minicssextractplugin.loader,
                    "css-loader"
                ]

            },
            {
                test : /\.(scss)$/,
                use : [
                    minicssextractplugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test : /\.(less)$/,
                use : [
                    minicssextractplugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test : /\.(hbs)$/,
                use : [
                    'hbs-loader'
                ]
            },
            {
                test : /\.(js|jsx)$/,
                exclude : /node-modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins:[
        new terserplugin(),
        new minicssextractplugin({
            filename: "bundle.css"
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['dist']}),
        new htmlwebpackplugin({
            template:"./src/template.html"
        })
    ]
}