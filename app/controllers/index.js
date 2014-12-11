import Ember from 'ember';

export default Ember.Controller.extend({
  grades: function () {
    return Ember.ArrayController.create({
      model: this.get('content'),
      sortProperties: [ 'id' ],
      sortAscending: false
    });
  }.property('content.@each.index')
});
