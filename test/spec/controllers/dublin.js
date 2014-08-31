'use strict';

describe('Controller: DublinCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var DublinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DublinCtrl = $controller('DublinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
