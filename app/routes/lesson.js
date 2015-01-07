import Ember from 'ember';

export default Ember.Route.extend({
  afterModel: function () {
    Ember.$('.lesson-modal').modal('show');
  }
});
