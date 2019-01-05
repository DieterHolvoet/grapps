const webpack = require('webpack');
const path = require('path');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entrypoints = require('./entrypoints.js');

const plugins = [
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                rucksack({ fallbacks: true }),
                autoprefixer({
                    browsers: ['> 0.5% in BE', 'last 10 versions', 'not ie <= 10'],
                }),
            ],
        },
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
];

module.exports = {
    mode: 'production',
    entry: entrypoints,
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        publicPath: 'assets',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loaders: [
                    'babel-loader',
                ],
                include: [
                    path.resolve(__dirname, '../src'),
                ],
            },
            {
                test: /\.s?css|sass/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.woff/,
                loaders: [
                    'file-loader',
                ],
            },
        ],
    },
    plugins,
    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../src'),
        ],
    },
};
