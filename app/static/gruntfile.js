module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['app/**/*.js', 'app/modules/**/*.js'],
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
            src: ['app/**/*.js', 'app/app.js', 'app/modules/**/*.js'],
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
        },
        injector: {
            options: {},
            local_dependencies: {
                files: {
                    'index.html': ['app/**/*.js', 'app/modules/**/*.js', '**/*.css'],
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-wiredep');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    
    grunt.loadNpmTasks('grunt-injector');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'wiredep', 'jasmine', 'injector']);

};
