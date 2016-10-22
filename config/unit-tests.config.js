/*
 * When testing with webpack and ES6, we have to do some extra
 * things get testing to work right. Because we are gonna write test
 * in ES6 to, we have to compile those as well. That's handled in
 * karma.conf.js with the karma-webpack plugin. This is the entry
 * file for webpack test. Just like webpack will create a bundle.js
 * file for our client, when we run test, it well compile and bundle them
 * all here! Crazy huh. So we need to do some setup
 * Thanks to @AngularClass for figuring this stuff out
*/
Error.stackTraceLimit = Infinity;

require('rxjs/Rx')
require('core-js');
require('ts-helpers');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(
  browser.BrowserDynamicTestingModule,
  browser.platformBrowserDynamicTesting()
);

/*
  Use the the context method on require that webpack created in order to tell
  webpack what files we actually want to require or import.  Below, context will
  be an function/object with file names as keys.  using that regex we are saying
  look in client/app and find any file that ends with spec.js and get its
  path. By passing in true we say do this recursively
*/
var appContext = require.context('../src/app', true, /\.spec\.ts/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
appContext.keys().map(appContext);
