/**
 * Gulp task that cleans all the distribution directories
 */
var del = require('del');

module.exports = function (gulp, plugins, config) {
    return function () {
        console.log('Cleaning distribution folder');

        return del([
            config.buildResultsDirectory + '/*'
        ]);
    };
};