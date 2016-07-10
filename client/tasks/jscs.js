/**
 * Gulp build task to perform source analysis
 */

module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.sourceFiles)
            .pipe(plugins.jscs({fix: true}))
            .pipe(plugins.jscs.reporter());
    };
};
