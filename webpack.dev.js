 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
     contentBase: "./app",
     index: "index.html",
     compress: false,
     port: 8080,
     open: true,
     //hot: true,
     watchOptions: {
         poll: true
     },
     watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: [
                 'style-loader',
                 'css-loader'
                ]
            }
        ]
    }
 });
