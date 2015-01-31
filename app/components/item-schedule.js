import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Component.extend({
  rows: function () {
    return Ember.ArrayController.create({
      model: groupBy(this.get('schedule.lessons'), 'index'),
      sortProperties: [ 'index' ],
      sortAscending: true
    });
  }.property('schedule.lessons'),

  cellTemplate: function () {
    var type = this.get('type');

    // Group cells are the same as student cells.
    if (type === 'Group') {
      type = 'Student';
    }

    return 'cell-' + type.toLowerCase();
  }.property('type')
});
