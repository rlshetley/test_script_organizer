var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

// Load the configuration file
var config = require('./tasks/gulp.config')();

// Loads the requested tasks
function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, config);
}

gulp.task('default', ['help']);

/**
 * Displays the task lsiting for the Gulp file
 */
gulp.task('help', plugins.taskListing);

/**
 * Builds the debug version of the application
 */
gulp.task('debug', ['jscs', 'lint', 'template-cache', 'wire-app']);

/**
 * Builds the release version of the application
 */
gulp.task('release', ['template-cache', 'minify']);

/**
 * Cleans all the distribution and CSS directories
 */
gulp.task('clean', ['clean-css', 'clean-dist']);

/**
 * Runs tests for the application
 */
gulp.task('test', ['unit-test']);

/**
 * Checks the JavaScript code style
 */
gulp.task('jscs', getTask('jscs'));

/**
 * Performs JSHint on the JavaScript
 */
gulp.task('lint', getTask('lint'));

/**
 * Compiles the LESS to CSS
 */
gulp.task('less', ['icons'], getTask('less'));

/**
 * Caches all the view templates for easier loading
 */
gulp.task('template-cache', getTask('template-cache'));

/**
 * Injects dependencies into the index page
 */
gulp.task('wire-app', ['css-build', 'browserify'], getTask('wire-app'));

/**
 * Compiles the JavaScript and CSS files to minified files
 * then includes them in the index.html
 */
gulp.task('minify', ['css-build', 'browserify'], getTask('minify'));

/**
 * Runs the unit tests through karma
 */
gulp.task('unit-test', getTask('unit-test'));

/**
 * Browserifies all the third party dependencies and the CSS
 */
gulp.task('browserify', getTask('browserify'));

/**
 * Copies icon files to the cirrect direcotry
 */
gulp.task('icons', getTask('icons'));

/**
 * Generates the CSS files for the application
 */
gulp.task('css-build', ['less'], getTask('css-build'));

/**
 * Cleans all the distribution directories
 */
gulp.task('clean-dist', getTask('clean-dist'));

/**
 * Cleans all the CSS directories
 */
gulp.task('clean-css', getTask('clean-css'));
