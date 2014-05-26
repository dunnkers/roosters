/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});


// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');
app.import('vendor/lodash/dist/lodash.js');
app.import('vendor/typeahead.js/dist/typeahead.bundle.js');
app.import('vendor/ember-google-analytics/ember-google-analytics.js');

var bootstrapJS = 'vendor/bootstrap-sass-official/vendor/assets/javascripts/bootstrap/';
app.import(bootstrapJS + 'collapse.js');
app.import(bootstrapJS + 'transition.js');
app.import('vendor/moment/moment.js');
app.import('vendor/moment/lang/nl.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});


module.exports = app.toTree();
