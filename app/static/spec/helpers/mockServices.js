function mockNotifyService(){
  return {
    onSuccess: jasmine.createSpy("onSuccess"),
    onError: jasmine.createSpy("onError")
  };
}

function failService($q){
  var defer = $q.defer();

  defer.reject();

  return {
    $promise: defer.promise
  };
}

function mockProjectService($q){
  var data = [{}, {}];
  return mockService($q, data, 'projects');
}

function mockTestEventService($q){
  var data = [{}, {}];
  return mockService($q, data, 'test_events');
}

function mockTestResultService($q){
  var data = [{}, {}];
  return mockService($q, data);
}

function mockTestService($q){
  var data = [{}, {}];
  return mockService($q, data, 'tests');
}

function mockTestSessionService($q){
  var data = [{}, {}];
  return mockService($q, data);
}

function mockTestEventResultsService($q){
  var data = [{}, {}];
  return mockService($q, data);
}

function mockTestSuiteService($q){
  var data = [{}, {}];
  return mockService($q, data, 'test_suites');
}

function mockUserAdminService($q){
  var data = [{}, {}];
  return {
    users: mockService($q, data, 'users'),
    roles: mockService($q, data, 'roles')
  };
}

function mockRoleManagementService($q){
  var data = [{}, {}];
  return mockService($q, data, 'roles');
}

function mockService($q, data, queryProp){
    return {
      get: _get,
      query: _query,
      update: _update,
      remove: _remove,
      save: _save,
      getLastSaveId: _getLastSaveId
    };

    var lastSaveId = 0;

    function _getLastSaveId(){
      return lastSaveId;
    }

    function _get(obj){
      var defer = $q.defer();

      defer.resolve(obj);

      return {
        $promise: defer.promise
      };
    }

    function _query() {
      var defer = $q.defer();

      var query_res = {};

      query_res[queryProp] = data;

      defer.resolve(query_res);

      return {
        $promise: defer.promise
      };
    }

    function _update(data) {
      var defer = $q.defer();

      defer.resolve();

      return {
        $promise: defer.promise
      };
    }

    function _remove(id) {
      var defer = $q.defer();

      defer.resolve();

      return {
        $promise: defer.promise
      };
    }

    function _save(data) {
      var defer = $q.defer();

      data.id = Math.floor((Math.random() * 10) + 1);

      lastSaveId = data.id;

      defer.resolve(data);

      return {
        $promise: defer.promise
      };
    }
}
