const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: {
        page: ['./src/js/script.js', './src/css/custom.css'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            // { test: /\.css$/, use: 'css-loader' },
            { // css / sass / scss loader for webpack
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  use: ['css-loader'],
                })
            }
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({template: './src/iframe/index.html'}),
        new HtmlWebpackPlugin({
            inject: true,
            chunks: ['page'],
            template: './src/index.html'
        }),
        new ExtractTextPlugin({ // define where to save the file
            filename: '[name].bundle.css',
            allChunks: true,
          }),
    ],
    externals: {
        jquery: 'jQuery'
    }
};

module.exports = config;