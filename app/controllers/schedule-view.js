import Ember from 'ember';
import groupBy from '../utils/group-by';
import Row from './row-controller';

export default Ember.ArrayController.extend({
  sortProperties: [ 'group' ],
  sortAscending: false,

  rowz: function () {
    return Ember.ArrayController.create({
      model: groupBy(this.get('content'), 'index').map(function (row) {
        return Row.create({
          model: row.get('content')
        });
      }),
      sortProperties: [ 'group' ],
      sortAscending: false
    });
  }.property('content.@each.index'),

  rows: function () {
    return groupBy(this.get('content'), 'index').map(function (row) {
      return Row.create({
        model: row.get('content')
      });
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
