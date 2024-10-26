const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const entryPoints = {
    dashboard: './src/js/dashboard.js',
    settings: './src/js/settings.js',
};

const createConfig = (isProduction) => ({
    plugins: [
        new MiniCssExtractPlugin({
            filename: `css/[name]${isProduction ? '.min' : ''}.css`,
        }),
    ],
    entry: entryPoints,
    output: {
        filename: `js/[name]${isProduction ? '.min' : ''}.js`,
        path: __dirname + '/assets',
    },
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
            new CssMinimizerPlugin()
        ],
    },
});

// Export array of configurations
module.exports = [
    createConfig(isProduction)
];