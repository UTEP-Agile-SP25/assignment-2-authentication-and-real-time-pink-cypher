const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        auth: './src/auth.js',
        config: './src/config.js',
        addusers: './src/addusers.js',
        signin: './src/signin.js',
        signout: './src/signout.js',
        bookSongs: './src/booksongs.js'
    },
    output: {
        filename: '[name].bundle.js',  // Generates index.bundle.js, auth.bundle.js, config.bundle.js
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.mjs'],  // Allows Webpack to resolve Firebase's ES modules
    },
    watch: true
};
