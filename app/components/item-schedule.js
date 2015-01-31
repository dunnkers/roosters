import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Component.extend({
  rows: function () {
    return Ember.ArrayController.create({
        model: groupBy(this.get('schedule.lessons'), 'index'),
        sortProperties: [ 'index' ],
        sortAscending: true
    });
  }.property('schedule.lessons')
});
