import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('schedule', { path: ':id' });

  this.route('index', { path: '/' }, function () {
    this.resource('grade', { path: '/grades/:grade_id' }, function () {
      this.route('group', { path: ':group_id' });
    });
  });
});

export default Router;
