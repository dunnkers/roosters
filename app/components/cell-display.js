import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Component.extend({
  single: function () {
    return this.get('lessons.length') === 1;
  }.property('lessons'),

  lesson: function () {
    return this.get('lessons.firstObject');
  }.property('lessons'),

  nested: function () {
    return this.get('clustered.length') > 1;
  }.property('clustered', 'lessons'),

  sibling: function () {
    return this.get('clustered.length') === 1;
  }.property('clustered', 'lessons'),

  clustered: function () {
    return groupBy(this.get('lessons'), 'cluster.id');
  }.property('lessons'),
});
