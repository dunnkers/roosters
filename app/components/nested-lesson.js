import Ember from 'ember';
import groupByProperties from '../utils/group-by-properties';

export default Ember.Component.extend({
  nested: function () {
    return groupByProperties(this.get('lessons'), [ 'subject', 'cluster.id' ]);
  }.property('lessons'),

  isNested: function () {
    return this.get('nested.length') > 1;
  }.property('nested'),

  // single sibling
  siblings: function () {
    return this.get('nested.firstObject');
  }.property('nested')
});
