const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    extensions: [".js", ".jsx",  ".ts", ".json", ".tsx", ".css"],
};
const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: 'Development',
        template: 'index.html'
    }),
];

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(configPath.root, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    module: webpackModule,
    plugins,
    resolve
};