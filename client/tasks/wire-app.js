/**
 * Gulp build task to create debug build of JavaScript
 */

module.exports = function (gulp, plugins, config) {
    return function () {
      console.log('Loading template ' + config.indexHtmlTemplate);
        console.log('Updating index.html in ' + config.indexHtmlOutput);

        return gulp.src(config.indexHtmlTemplate)
            .pipe(plugins.inject(gulp.src(config.indexjsOutput, { read: false }), { starttag: '<!-- inject:indexjs -->' }))
            .pipe(plugins.inject(gulp.src(config.sourceFiles, { read: false })))
            .pipe(plugins.inject(gulp.src(config.cssOutput, { read: false })))
            .pipe(plugins.rename(config.indexHtmlOutput))
            .pipe(gulp.dest('./'));
    };
};
