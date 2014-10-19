import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  sortProperties: [ 'group' ],
  sortAscending: false,

  rows: function () {
    return Ember.ArrayController.create({
      model: groupBy(this.get('content'), 'index').map(function (row) {
        return Ember.ArrayController.create({
          model: groupBy(row.get('content'), 'day'),
          sortProperties: [ 'group' ],
          sortAscending: true
        });
      }),
      sortProperties: [ 'group' ],
      sortAscending: true
    });
  }.property('content.@each.index'),

  table: function () {

    var grouped = groupBy(this.get('content'), 'index');

    return grouped.map(function (row) {
      return groupBy(row.get('content'), 'day');
    }).map(function (row, index) {
      return row.insertAt(0, Ember.Object.create({
        index: index + 1,
        header: true
      }));
    });
  }.property('content.@each.index')
});
