import Ember from 'ember';

export default Ember.ObjectController.extend({
  sortedStudents: function () {
    return Ember.ArrayController.create({
      model: this.get('students'),
      sortProperties: [ 'name' ],
      sortAscending: true
    });
  }.property('students')
});
