/**
 * Gulp task that cleans all the CSS directories
 */
var del = require('del');

module.exports = function (gulp, plugins, config) {
    return function () {
        console.log('Cleaning CSS folder');

        return del([
            config.lessOutput + '/*'
        ]);
    };
};