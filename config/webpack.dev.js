const webpack = require('webpack');
const path = require('path');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
];

module.exports = {
    mode: 'development',
    entry: entrypoints,
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        publicPath: 'assets',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?/,
                loaders: [
                    'eslint-loader',
                ],
            },
            {
                test: /\.jsx?/,
                loaders: [
                    'babel-loader',
                ],
                include: path.resolve(__dirname, '../assets'),
            },
            {
                test: /\.s?css|sass/,
                loaders: [
                    'style-loader',
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
            path.resolve(__dirname, '../assets'),
        ],
    },
    devtool: 'eval',
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, '../public'),
        proxy: {
            '*': {
                target: 'http://localhost',
                changeOrigin: true,
                onProxyReq: (proxyReq) => {
                    proxyReq.setHeader('host', 'grapps.dev.dieterholvoet.com');
                },
            },
        },
    },
};
