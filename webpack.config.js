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
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader?presets[]=es2015!ng-annotate-loader', exludes: '/node_modules/'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
