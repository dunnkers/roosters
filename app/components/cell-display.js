import Ember from 'ember';
import groupBy from '../utils/group-by';
import groupByProperties from '../utils/group-by-properties';

export default Ember.Component.extend({
  single: function () {
    return this.get('lessons.length') === 1;
  }.property('lessons'),

  lesson: function () {
    return this.get('lessons.firstObject');
  }.property('lessons'),

  // nested and siblings ...
  nested: function () {
    return groupByProperties(this.get('lessons'), [ 'subject', 'cluster.id' ]);
  }.property('lessons'),

  isNested: function () {
    return this.get('nested.length') > 1;
  }.property('lessons', 'nested')
});
