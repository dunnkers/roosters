import Ember from 'ember';

export default Ember.Controller.extend({
  gradesSorted: function () {
    return Ember.ArrayController.create({
      model: this.get('model.grades'),
      sortProperties: [ 'id' ],
      sortAscending: false
    });
  }.property('grades')
});
