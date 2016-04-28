/**
 * Gulp build to run unit tests with karma
 */

var karma = require('karma');

module.exports = function (gulp, plugins, config) {
    return function (done) {
        var server = new karma.Server(config.karma, done);

        server.start();
    };
};