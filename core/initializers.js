with (scope()) {
  scope.__initializers = [];
  scope.__blocking_initializers = [];
  
  define('initializer', function(callback, blocking) {
    (blocking ? scope.__blocking_initializers : scope.__initializers).push(callback);
  });
    
  define('run_initializers', function() {
    if (scope.__blocking_initializers.length) {
      scope.__blocking_initializers.shift()();
    }
    else {
      for (var i=0; i < scope.__initializers.length; i++) scope.__initializers[i]();
      delete scope.__initializers;
      delete scope.__blocking_initializers;
    }
  });
  
  // setup browser hook
  window.onload = function() {
    run_initializers();
  }
}