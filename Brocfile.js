/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  sassOptions: {
    includePaths: [
      'bower_components/bootstrap-sass-official/assets/stylesheets'
    ]
  }
});

// bootstrap javascript
var javascripts = app.bowerDirectory + '/bootstrap-sass-official/assets/javascripts/bootstrap/';
app.import(javascripts + 'transition.js');
app.import(javascripts + 'modal.js');

// twitter typeahead.js
app.import({
  development: app.bowerDirectory + '/typeahead.js/dist/typeahead.jquery.js',
  production: app.bowerDirectory + '/typeahead.js/dist/typeahead.jquery.min.js'
});

// moment locale
app.import(app.bowerDirectory + '/moment/locale/nl.js');


module.exports = app.toTree();
