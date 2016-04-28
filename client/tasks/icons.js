/**
 * Gulp build task to copy icons files for Bootstrap and Font-Awesome to the dist folder
 */

module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.fonts.bootstrapFonts)
            .pipe(gulp.dest(config.fonts.destination));
    };
};
