(function () {
    'use strict';

    angular
        .module('app')
        .controller('errorController', errorController);

    errorController.$inject = [];

    function errorController(){
        /* jshint validthis: true */
        var vm = this;
    }
})();
