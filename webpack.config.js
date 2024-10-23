const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const entryPoints = {
    'settings': './src/js/settings.js',
    'dashboard': './src/js/dashboard.js',
};

module.exports = {
    entry: {
        'settings': './src/js/settings.js',
        'dashboard': './src/js/dashboard.js',
    },
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/[name].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@wordpress/default']
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            }
        ]
    },
    optimization: {
        minimize: isProduction,
        minimizer: [
            // For JavaScript
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
            // For CSS
            new CssMinimizerPlugin()
        ],
    },
    // Generate unminified versions in production
    ...(isProduction && {
        entry: {
            'settings': './src/js/settings.js',
            'dashboard': './src/js/dashboard.js',
        },
        output: {
            path: path.resolve(__dirname, 'assets'),
            filename: (pathData) => {
                return pathData.chunk.name.includes('.min')
                    ? 'js/[name].js'
                    : 'js/[name].min.js';
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: (pathData) => {
                    return pathData.chunk.name.includes('.min')
                        ? 'css/[name].css'
                        : 'css/[name].min.css';
                },
            }),
        ],
    })
};