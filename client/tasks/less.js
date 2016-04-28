/**
 * Gulp build to compile LESS files
 */

module.exports = function (gulp, plugins, config) {
    return function () {
        console.log('Compiling less');

        return gulp.src(config.lessSrc)
          .pipe(plugins.less({}))
          .pipe(gulp.dest(config.lessOutput));
    };
};