import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  sortProperties: [ 'day' ],
  sortAscending: true,

  days: function () {
    return groupBy(this.get('content'), 'day');
  }.property('content.@each.index')
});
