'use strict';

describe('Service: Spots', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var Spots;
  beforeEach(inject(function (_Spots_) {
    Spots = _Spots_;
  }));

  it('should do something', function () {
    expect(!!Spots).toBe(true);
  });

});
