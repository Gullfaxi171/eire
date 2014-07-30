'use strict';

describe('Service: County', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var County;
  beforeEach(inject(function (_County_) {
    County = _County_;
  }));

  it('should do something', function () {
    expect(!!County).toBe(true);
  });

});
