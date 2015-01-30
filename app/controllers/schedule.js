import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ObjectController.extend({
  rows: function () {
    return Ember.ArrayController.create({
        model: groupBy(this.get('lessons'), 'index'),
        sortProperties: [ 'index' ],
        sortAscending: true
    });
  }.property('lessons')
});
