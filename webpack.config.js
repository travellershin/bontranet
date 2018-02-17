var path = require("path")

module.exports = {
    entry: "./app/scripts/app.js",
    output: {
        path: path.resolve(__dirname, "./app/public/scripts") ,
        filename: "app.js"
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
