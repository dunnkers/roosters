import Ember from 'ember';

export default Ember.ObjectController.extend({
  sortedGroups: function () {
    return Ember.ArrayController.create({
      model: this.get('groups'),
      sortProperties: [ 'id' ],
      sortAscending: true
    });
  }.property('groups')
});
