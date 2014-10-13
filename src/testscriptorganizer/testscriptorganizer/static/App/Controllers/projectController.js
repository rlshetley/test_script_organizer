function projectController($scope, projectService, testEventService, $modal, $location)
{
    $scope.loadProjects = function () {
        projectService.query()
            .$promise.then(function (data) {
                $scope.projects = data;
            });
    }

    $scope.add = function () {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/ProjectModalDialog.html',
            controller: modalProjectController,
            resolve:
            {
                project: function () {
                    return { id: 0, name: '' };
                },
                title: function()
                {
                    return "Add a Project";
                }
            }
        });

        modalInstance.result.then(function (project)
        {
            projectService.save(project)
                .$promise.then(function (data)
                {
                    $scope.projects.push(data);
                });
        },
        function ()
        {
        });
    };

    $scope.remove = function (id) {
        projectService.remove({ id: id });
    };

    $scope.createTestEvent = function(projectId){
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/TestEventModalDialog.html',
            controller: modalTestEventController,
            resolve:
            {
                testEvent: function ()
                {
                    return { id: 0, name: '', project: projectId, date: moment().toJSON() };
                }
            }
        });

        modalInstance.result.then(function (project)
        {
            testEventService.save(project)
                .$promise.then(function (data)
                {
                    $location.path('/testEvent/' + data.id);
                });
        },
        function ()
        {
        });
    };

    $scope.saveProject = function(project)
    {
        projectService.update(project);
    };

    $scope.loadProjects();

    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.projects = [];

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.projects.length / $scope.itemsPerPage);
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };
};

projectController['$inject'] = ['$scope', 'projectService', 'testEventService', '$modal', '$location'];

var modalProjectController = function ($scope, $modalInstance, project, title) {
    $scope.project = project;

    $scope.title = title;

    $scope.ok = function () {
        $modalInstance.close($scope.project);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};

var modalTestEventController = function ($scope, $modalInstance, testEvent)
{
    $scope.testEvent = testEvent;

    $scope.ok = function ()
    {
        $modalInstance.close($scope.testEvent);
    };

    $scope.cancel = function ()
    {
        $modalInstance.dismiss('cancel');
    };
};