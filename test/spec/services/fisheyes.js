'use strict';

describe('Service: fisheyes', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var fisheyes;
  beforeEach(inject(function (_fisheyes_) {
    fisheyes = _fisheyes_;
  }));

  it('should do something', function () {
    expect(!!fisheyes).toBe(true);
  });

});
