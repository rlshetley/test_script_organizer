(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .controller('projectController', projectController);

    projectController.$inject = ['projectService', 'testEventService', '$modal', '$location', 'notifyService'];

    function projectController(projectService, testEventService, $modal, $location, notifyService){

        /* jshint validthis: true */
        var vm = this;

        vm.add = _add;

        vm.remove = _remove;

        vm.saveProject = _saveProject;

        vm.projects = [];

        _init();

        function _init() {
            projectService.query().$promise
                .then(
                    function (data) {
                        vm.projects = data.projects;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to load projects", e);
                    }
                );
        }

        function _saveProject(project){
            projectService.update(project).$promise
                .then(
                    function (data){
                        notifyService.onSuccess("Project successfully saved");
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to update project", e);
                    }
                );
        }

        function _add(){

            var modalInstance = $modal.open({
                templateUrl: 'app/modules/projects/projectModal.tmpl.html',
                controller: modalProjectController,
                resolve:{
                    project: function () {
                        return { id: 0, name: '' };
                    },
                    title: function(){
                        return "Add a Project";
                    }
                }
            });

            modalInstance.result.then(function (project){
                projectService.save(project).$promise
                    .then(
                        function (data){
                            vm.projects.push(data);

                            notifyService.onSuccess("Project successfully added");
                        }
                    )
                    .catch(
                        function(e){
                            notifyService.onError("Unable to add project", e);
                        }
                    );
            });
        }

        function _remove(id) {
            projectService.remove({ id: id }).$promise
                .then(
                    function (data){
                        notifyService.onSuccess("Project successfully removed");
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to remove project", e);
                    }
                );
        }
    }

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
})();
