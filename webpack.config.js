const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, '/src/components'),
        },
        compress: true,
        port: 8080,
    },
    module: {
        rules : [
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts', 'jsx']
    },
    plugins: [
        new htmlWebpackPlugin(
            {
                template: './src/index.html',
                favicon: './src/favicon.ico'
            }
        )
    ],
    performance: {
        hints: false
    }

}