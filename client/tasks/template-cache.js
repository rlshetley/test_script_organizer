/**
 * Gulp build task to generate AngularJS template cache
 */

module.exports = function (gulp, plugins, config) {
    return function () {
        console.log('Creating an AngularJS $templateCache');

        return gulp
            .src(config.htmlTemplates)
            .pipe(plugins.angularTemplatecache(
                config.templateCache.file,
                config.templateCache.options
            ))
            .pipe(gulp.dest('./'));
    };
};