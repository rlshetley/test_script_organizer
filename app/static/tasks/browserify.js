/**
 * Gulp build task to browserify the third-party JavaScript libraries
 */

var browserify = require('browserify');
var source = require('vinyl-source-stream');

module.exports = function (gulp, plugins, config) {
    return function () {
        return browserify({
            entries: config.indexjs
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest(config.buildResultsDirectory));
    };
};