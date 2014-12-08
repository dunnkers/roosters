import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Component.extend({
  nested: function () {
    return groupBy(this.get('lessons'), 'subject', 'cluster.id' );
  }.property('lessons'),

  isNested: function () {
    return this.get('nested.length') > 1;
  }.property('nested'),

  // single sibling
  siblings: function () {
    return this.get('nested.firstObject');
  }.property('nested')
});
