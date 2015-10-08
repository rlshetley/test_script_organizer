module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['app/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        wiredep: {
            task: {

                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                  'index.html'
                ],
                options: {
                }
            }
        },
        jasmine: {
          tso: {
            src: ['app/**/*.js', 'app/app.js'],
            options: {
              specs: 'spec/**/*spec.js',
              helpers: 'spec/helpers/*.js',
              vendor: [
                'scripts/angular/angular.js',
                'scripts/angular-route/angular-route.js',
                'scripts/angular-resource/angular-resource.js',
                'scripts/angular-cookies/angular-cookies.js',
                'scripts/angular-xeditable/dist/js/xeditable.js',
                'scripts/angular-mocks/angular-mocks.js',
                'scripts/angular-bootstrap/ui-bootstrap.js',
                'scripts/moment/moment.js'
              ]
            }
          }
        }
    });

    // Load the bower js plugin
    grunt.loadNpmTasks('grunt-wiredep');

    // Load the jshint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'wiredep', 'jasmine']);

};
