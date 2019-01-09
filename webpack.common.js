const path = require("path");

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: './demo/index.js'
    },
    plugins: [
         new CleanWebpackPlugin(['app']),
         new HtmlWebpackPlugin({
             title: 'Production',
             inject: 'footer',
             template: './demo/index.html'
        })
    ],
    output: {
        filename: '[name].bundle.min.js',
        path: path.resolve(__dirname, "app")
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
