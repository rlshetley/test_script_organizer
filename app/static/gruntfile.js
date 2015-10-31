module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js'],
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
                  'app/views/**/*.html',   // .html support...
                  'app/views/**/*.jade',   // .jade support...
                  'app/styles/main.scss',  // .scss & .sass support...
                  'app/config.yml'         // and .yml & .yaml support out of the box!
                ],
                options: {
                }
            }
        },
        bowerInstall: {

            target: {

                // Point to the files that should be updated when
                // you run `grunt bower-install`
                src: [
                  'index.html',   // .html support...
                ],

                // Optional:
                // ---------
                cwd: '',
                dependencies: true,
                devDependencies: false,
                exclude: [],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-install');

    // Load the bower js plugin
    grunt.loadNpmTasks('grunt-wiredep');

    // Load the jshint plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'wiredep']);

};
