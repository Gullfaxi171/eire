'use strict';

describe('Service: photospheres', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var photospheres;
  beforeEach(inject(function (_photospheres_) {
    photospheres = _photospheres_;
  }));

  it('should do something', function () {
    expect(!!photospheres).toBe(true);
  });

});
