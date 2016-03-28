var jQuerySpy = jasmine.createSpy('jQuery');
var appendSpy = jasmine.createSpy('append');

var jQuerySpies = {
  append: appendSpy
};

var jQuery = function(selector) {
  jQuerySpy(selector);

  return jQuerySpies;
};




