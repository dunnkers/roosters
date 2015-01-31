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
app.import(javascripts + 'collapse.js');

// twitter typeahead.js
app.import({
  development: app.bowerDirectory + '/typeahead.js/dist/typeahead.jquery.js',
  production: app.bowerDirectory + '/typeahead.js/dist/typeahead.jquery.min.js'
});

// moment locale
app.import(app.bowerDirectory + '/moment/locale/nl.js');

// google analytics
if (app.env === 'production') {
  app.import(app.bowerDirectory + '/ember-google-analytics/ember-google-analytics.js');
}


module.exports = app.toTree();
