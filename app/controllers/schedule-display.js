import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  rows: function () {
    return Ember.ArrayController.create({

        model: groupBy(this.get('content'), 'index').map(function (row, index) {

          return Ember.ArrayController.create({
            model: groupBy(row.get('content'), 'day'),
            sortProperties: [ 'day' ],
            sortAscending: true
          });
        }),
        sortProperties: [ 'index' ],
        sortAscending: false
    });
  }.property('content.@each.index')
});
