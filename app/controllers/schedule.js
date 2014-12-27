import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ObjectController.extend({
  scheduleChanged: function () {
    Ember.run.once(this, () => {
      this.send('outletLoaded');
    });
  }.observes('lessons'),

  rows: function () {
    var rows = groupBy(this.get('lessons'), 'index');

    rows = rows.map(function (row, index) {
      return Ember.Object.create({
        index: index + 1,

        cells: Ember.ArrayController.create({
          model: groupBy(row.get('content'), 'day'),
          sortProperties: [ 'day' ],
          sortAscending: true
        })
      });
    });

    return Ember.ArrayController.create({
        model: rows,
        sortProperties: [ 'index' ],
        sortAscending: true
    });
  }.property('lessons'),

  mockup: [1, 2, 3, 4, 5, 6, 7, 8]
});
