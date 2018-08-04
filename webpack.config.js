var path = require("path")

module.exports = {
    entry: {
        index: "./app/scripts/index.js"
    },
    output: {
        path: path.resolve(__dirname, "./app/public/scripts") ,
        filename: "[name].js"
    },
    devtool: '#inline-source-map',
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}