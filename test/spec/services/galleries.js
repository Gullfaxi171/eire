'use strict';

describe('Service: galleries', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var galleries;
  beforeEach(inject(function (_galleries_) {
    galleries = _galleries_;
  }));

  it('should do something', function () {
    expect(!!galleries).toBe(true);
  });

});
