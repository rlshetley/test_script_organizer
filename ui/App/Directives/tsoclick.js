(function() {
    'use strict';

    angular
        .module('app')
        .directive('tsoclick', tsoclick);

    tsoclick.$inject = ['$location'];
    
    function tsoclick($location)
    {
        return {
        restrict: 'AE',
        link: function (scope, element, attrs)
        {
            var path;

            attrs.$observe('tsoclick', function (val)
            {
                path = val;
            });

            element.bind('click', function ()
            {
                scope.$apply(function ()
                {
                    $location.path(path);
                });
            });
        }
    };
    };

})();