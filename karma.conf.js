// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    logLevel: config.LOG_DEBUG,
    files: [
        'node_modules/angular/angular.js',
         //'dist/cdr.js',
        'src/angular-grid-directive.js',
        'tests/angular-grid-directive.tests.js'
    ]
  });
};