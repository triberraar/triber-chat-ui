// Karma configuration
// Generated on Fri Apr 29 2016 19:36:17 GMT+0200 (CEST)
'use strict';

var libFiles = [
    'src/lib/angular/angular.js',
    'src/lib/angular-sanitize/angular-sanitize.js',
    'src/lib/angular-animate/angular-animate.js',
    'src/lib/angular-resource/angular-resource.js',
    'src/lib/angular-ui-router/release/angular-ui-router.js',
    'src/lib/angular-messages/angular-messages.js',
    'src/lib/lodash/lodash.js',
    'src/lib/angular-bootstrap/ui-bootstrap-tpls.js',
    'src/lib/AngularJS-Toaster/toaster.js',
    'src/lib/angular-jwt/dist/angular-jwt.js',
    'src/lib/ng-password-strength/dist/scripts/ng-password-strength.js',
    'src/lib/angular-recaptcha/release/angular-recaptcha.js',
    'src/lib/ladda/js/spin.js',
    'src/lib/ladda/js/ladda.js',
    'src/lib/angular-ladda/dist/angular-ladda.js',
    'src/lib/angular-mocks/angular-mocks.js'
];

var applicationFiles = [
    'src/js/**/*.js'
];

var testFiles = [
    'src/js/**/*_spec.js'
];

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: libFiles.concat(applicationFiles).concat(testFiles),


        // list of files to exclude
        exclude: ['src/js/dst/*.js'],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/js/**/!(*spec).js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['story', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,
        coverageReporter: {
            reporters: [{
                type: 'text'
            }, {
                type: 'lcov',
                dir: 'coverage-frontend/'
            }]
        }
    });
    if (process.env.TRAVIS) {
        config.reporters.push('coveralls');
    }
};
