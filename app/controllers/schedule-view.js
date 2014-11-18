import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  sortProperties: [ 'group' ],
  sortAscending: false,

  rows: function () {
    return Ember.ArrayController.create({
      // group rows (days)
      model: groupBy(this.get('content'), 'index').map(function (row, index) {
        // group cells
        var days = groupBy(row.get('content'), 'day');

        days.insertAt(0, Ember.Object.create({
          group: -1,
          header: true,
          index: index + 1
        }));

        return Ember.ArrayController.create({
          model: days,
          sortProperties: [ 'group' ],
          sortAscending: true
        });
      }),
      sortProperties: [ 'group' ],
      sortAscending: true
    });
  }.property('content.@each.index')
});
