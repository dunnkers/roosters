import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ObjectController.extend({
  cells: function () {
    return Ember.ArrayController.create({
      model: groupBy(this.get('content.content'), 'day'),
      sortProperties: [ 'day' ],
      sortAscending: true
    });
  }.property('content'),

  rowIndex: function () {
    return this.get('index') + 1;
  }.property('index'),
});
