const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

 module.exports = merge(common, {
   mode: 'production',
     devtool: 'source-map',
     optimization: {
         minimizer: [
             new UglifyJsPlugin({
                 cache: true,
                 parallel: true,
                 sourceMap: true // set to true if you want JS source maps
             }),
             new OptimizeCSSAssetsPlugin({})
         ]
     },
     plugins: [
         new MiniCssExtractPlugin({
             filename: "[name].css",
             chunkFilename: "[id].css"
         }),
         new webpack.DefinePlugin({
             //"process.env.NODE_ENV": JSON.stringify("production")
         })
     ],
     module: {
         rules: [
             {
                 test: /\.css$/,
                 use: [
                     MiniCssExtractPlugin.loader,
                     //'style-loader',
                     "css-loader"
                 ]
             }
         ]
     }
 });
