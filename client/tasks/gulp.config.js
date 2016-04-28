var fs = require('fs');
var util = require('gulp-util');

module.exports = function () {
    var clientApp = './app';

    var buildResultsDirectory = './dist';

    var appMin = buildResultsDirectory + '/app.min.js';

    var cssDirectory = buildResultsDirectory + '/css';

    var parentDirectory = process.cwd();

    var config = {
        indexjs: ['./index.js'],
        indexjsOutput: [buildResultsDirectory + '/index.js'],
        indexHtmlTemplate: 'index.tmpl.html',
        indexHtmlOutput: 'index.html',
        lessSrc: './less/*.less',
        templateCache: {
            file: 'dist/templates.js',
            options: {
                module: 'rewards',
                root: 'app/',
                standAlone: false
            }
        },
        sourceFiles: [
            clientApp + '/app.js',
            clientApp + '/**/**/*.module.js',
            clientApp + '/app.*.js',
            clientApp + '/**/*.js',
            clientApp + '/**/**/*.js'
        ],
        htmlTemplates: [
            clientApp + '/**/**/*.html'],
        karma: {
            configFile: parentDirectory + '/karma.conf.js',
            singleRun: true
        },
        applicationMinifiedFile: appMin,
        minificationOutputFile: 'app.js',
        lessOutput: 'css',
        cssDirectory: cssDirectory,
        cssOutput: cssDirectory + '/*.css',
        buildResultsDirectory: buildResultsDirectory,
        cssFiles: [
            'css/*.css',
            'node_modules/angucomplete-alt/angucomplete-alt.css',
            'node_modules/angular-block-ui/dist/angular-block-ui.css',
            'node_modules/angular-ui-select/select.css',
            'node_modules/spinkit/css/spinkit.css'
        ],
        fonts: {
            bootstrapFonts: 'node_modules/bootstrap/fonts/**.*',
            destination: './dist/fonts'
        }
    }

    return config;
}
