'use strict';

describe('Controller: PhotosphereCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var PhotosphereCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhotosphereCtrl = $controller('PhotosphereCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
