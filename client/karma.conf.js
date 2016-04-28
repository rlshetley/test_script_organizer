module.exports = function(config) {
    config.set({
        basePath: './',

        frameworks: ['jasmine'],

        files: [
            'dist/index.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'spec/helpers/*.js',
            'js/app/app.js',
            'js/app/**/*.module.js',
            'js/app/**/*.js',
            'js/app/**/**/*.js',
            'js/test/**/**spec.js',
            'js/app/**/*.html'
        ],


        // list of files to exclude
        exclude: [],

        preprocessors: {
            'js/app/**/!(*routes|*module).js': ['coverage'],
            'js/app/**/*.html': 'ng-html2js'
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

        browsers: ['PhantomJS'],

        singleRun: false
    });
}
