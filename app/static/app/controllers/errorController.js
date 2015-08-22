(function () {
    'use strict';

    angular
        .module('app')
        .controller('errorController', errorController);

    errorController.$inject = [];

    function errorController(){
        var vm = this;
    };
})();
