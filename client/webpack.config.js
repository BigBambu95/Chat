const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devServer = require('./webpack/devserver');

const config = {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: ['babel-loader']
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: "[name]__[local]__[hash:base64:5]"
                                }
                            }
                        },
                        { loader: 'postcss-loader' }
                    ]
                }   

            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public/index.html')
            }),
        ]
}

module.exports = (env, arg) => {
    if(arg.mode === 'production') {
        return config;
    }

    if(arg.mode === 'development') {
        config.devtool = 'eval-source-map';

        return merge([
            config,
            devServer()
        ])
    }
}