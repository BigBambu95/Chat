const path = require('path');

module.exports = () => {
    return {
        devServer: {
            contentBase: path.resolve(__dirname, 'public'),
            watchContentBase: true,
            progress: true,
            compress: true,
            hot: true,
            inline: true,
            overlay: true,
            historyApiFallback: true
        }
    }
}