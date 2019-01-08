const path = require("path");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: './index.js'
    },
    plugins: [
         new CleanWebpackPlugin(['dist']),
         new HtmlWebpackPlugin({
             title: 'Production',
             inject: 'footer',
             template: './index.html'
        })
    ],
    output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }
        ]
    }
};
