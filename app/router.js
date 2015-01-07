import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.resource('item', { path: '/:item_id' }, function () {
    this.resource('lesson', { path: '/:lesson_id' });
  });

  this.resource('grades', { path: '/' }, function () {
    this.resource('grade', { path: '/grades/:grade_id' }, function () {
      this.resource('cluster', { path: '/clusters/:cluster_id' });
      this.resource('group', { path: '/groups/:group_id' });
    });
  });
});

export default Router;
