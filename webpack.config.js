var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './app/index.js'
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname + '/build'
    },
    devtool: 'source-map',
    module: {
        loaders: [
             {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                  presets: ['es2015'],
                  plugins: ['syntax-object-rest-spread', "transform-object-rest-spread"]
                }
              }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
