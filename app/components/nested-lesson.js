import Ember from 'ember';

export default Ember.Component.extend({
  single: function () {
    return this.get('lessons.length') === 1;
  }.property('lessons'),

  lesson: function () {
    return this.get('lessons.firstObject');
  }.property('lessons'),
});
