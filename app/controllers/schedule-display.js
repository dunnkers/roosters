import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  rows: function () {
    return Ember.ArrayController.create({

        model: groupBy(this.get('content'), 'index').map(function (row, index) {

          var cells = groupBy(row.get('content'), 'day');
          cells.push(Ember.Object.create({
            day: -1,
            header: true,
            index: index + 1
          }));

          return Ember.ArrayController.create({
            model: cells,
            sortProperties: [ 'day' ],
            sortAscending: true
          });
        }),
        sortProperties: [ 'index' ],
        sortAscending: false
    });
  }.property('content.@each.index')
});
