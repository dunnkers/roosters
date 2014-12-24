import Ember from 'ember';

export default Ember.ObjectController.extend({
  wow: function () {
    return this.get('item.schedule').then(function(schedule) {
      return schedule;
    });
    return this.get('item.schedule.lessons');
  }.property('item.schedule.lessons')
});
