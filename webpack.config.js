const path = require('path');

module.exports = {
    entry: "./app",
    output: {
        path: path.resolve(__dirname, "app"),
        filename: "bundle.js",
    },

    devtool: "eval-source-map",

    devServer: {
        contentBase: path.join(__dirname, "app"),
        compress: true,
        port: 9000
    },

     module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { presets: ['env'] }
            }
        ]
    }

}
