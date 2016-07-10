module.exports = function(config) {
    config.set({
        basePath: './',

        frameworks: ['jasmine'],

        files: [
            'dist/index.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/app.js',
            'app/**/*.module.js',
            'app/**/*.js',
            'app/**/**/*.js',
            'spec/**/**.spec.js',
            'app/**/*.html'
        ],


        // list of files to exclude
        exclude: [],

        preprocessors: {
            'app/**/!(*routes|*module).js': ['coverage'],
            'app/**/*.html': 'ng-html2js'
        },

        coverageReporter: {
            reporters: [
                { type: 'html' }
            ]
        },

        reporters: ['spec', 'coverage'],


        // web server port
        port: 9876,

        colors: true,

        logLevel: config.LOG_WARN,

        autoWatch: false,

        browsers: ['PhantomJS2'],

        singleRun: false
    });
}
