/**
 * Gulp build task to perform Lint analysis of code
 */

module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.sourceFiles)
          .pipe(plugins.jshint())
          .pipe(plugins.jshint.reporter('default'));
    };
};