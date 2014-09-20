tsoApp.directive('tsoclick', function ($location)
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
});