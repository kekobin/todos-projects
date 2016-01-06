/**
 * Created by KeBin on 6/1/16.
 */
"use strict";

describe('Controller: CommonController', function() {
  var CommonController;

  /**
   * Set up.
   */
  beforeEach(function() {
    module('angularTodoApp');
    inject(function($injector) {
      CommonController = $injector.get('CommonController');
    });
  });

  it('should have a getDictionary function', function() {
    expect(1).toBe(
      true);
  });

  // it('should have a getEntry function', function() {
  //   expect(angular.isFunction(dictionaryService.getEntry)).toBe(true);
  // });
  //
  // it('should have a query function', function() {
  //   expect(angular.isFunction(dictionaryService.query)).toBe(true);
  // });
});
