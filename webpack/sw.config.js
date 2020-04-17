const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const configPath = require('../config/path');

// webpack module 配置
const webpackModule = {
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-typescript',
                            {
                                isTSX: true,
                                allExtensions: true
                            }
                        ],
                        '@babel/preset-react',
                        '@babel/preset-env',
                    ]
                }
            }
        },
        {
            test: /\.m?js|$/,
            exclude: /node_modules/,
            include: /src/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                }
            }
        }
    ]
};
const resolve = {
    modules: [
        "node_modules",
        path.resolve(configPath.root, "src")
    ],
    extensions: [".js", ".jsx", ".ts", ".json", ".tsx", ".css"],
};
const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Development',
        template: 'index.html'
    }),
    new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        background_color: '#ffffff',
        gcm_sender_id: '71562645621',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    }),
    new WorkboxPlugin.InjectManifest({
        // 这些选项帮助快速启用 ServiceWorkers
        // 不允许遗留任何“旧的” ServiceWorkers
        swSrc: path.resolve(configPath.root, 'sw.js')
    }),
];

const optimization = {
    minimize: true,
    runtimeChunk: {
        name: 'runtime'
    },
    splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minRemainingSize: 0,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
            defaultVendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    }
};

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    output: {
        filename: '[name].js',
        path: path.resolve(configPath.root, 'sw-dist'),
    },
    devtool: false,
    module: webpackModule,
    plugins,
    resolve,
    optimization
};