/**
 * Gulp build task that minifies and injects JavaScript files for release builds
 */

module.exports = function (gulp, plugins, config) {
    return function () {
        console.log('Minifying JavaScript');

        gulp.src(config.sourceFiles)
            .pipe(plugins.concat(config.minificationOutputFile))
            .pipe(plugins.minify())
            .pipe(gulp.dest(config.buildResultsDirectory));

        console.log('Updating index.html');

        return gulp.src(config.indexHtmlTemplate)
            .pipe(plugins.inject(gulp.src(config.indexjsOutput, { read: false }), { starttag: '<!-- inject:indexjs -->' }))
            .pipe(plugins.inject(gulp.src(config.applicationMinifiedFile, { read: false }, { starttag: '<!-- inject:js -->' })))
            .pipe(plugins.inject(gulp.src(config.cssOutput, { read: false })))
            .pipe(plugins.inject(gulp.src(config.templateCache.file, { read: false }), { starttag: '<!-- inject:templates -->' }))
            .pipe(plugins.rename(config.indexHtmlOutput))
            .pipe(gulp.dest('./'));
    };
};
