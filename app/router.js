import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('application');
  this.route('grades');
  this.route('schedule', { path: ':id' });
});

export default Router;
