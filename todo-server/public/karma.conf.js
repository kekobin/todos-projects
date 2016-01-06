/**
 * Created by KeBin on 6/1/16.
 */

// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'angular-todos/bower_components/angular/angular.js',
      'angular-todos/bower_components/angular-ui-router/release/angular-ui-router.js',
      'angular-todos/bower_components/angular-mocks/angular-mocks.js',
      'angular-todos/app.js',
      'angular-todos/js/*.js',
      'angular-todos/js/*/*.js',
      'test/spec/*/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true

    //plugins: ['karma-jasmine', 'karma-phantomjs-launcher']
  });
};
