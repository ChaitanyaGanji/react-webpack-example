const path = require ('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const htmlwebpackplugin = require('html-webpack-plugin')
const minicssextractplugin = require('mini-css-extract-plugin')

module.exports = {
    entry : "./index.js",
    output : {
        filename : "bundle.[contenthash].js",
        path: path.resolve( __dirname , "./dist"),
        publicPath : ""
    },
    mode:"production",
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
    resolve : {
        extensions : ['*' , '.js' , '.jsx']
    },
    plugins:[
        new minicssextractplugin({
            filename: "bundle.[contenthash].css"
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns:['dist']}),
        new htmlwebpackplugin({
            template:"./src/template.html"
        })
    ]
}