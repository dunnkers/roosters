import Ember from 'ember';

export default Ember.Component.extend({
  arrangedAudiences: function() {
    return Ember.ArrayController.create({
      model: this.get('audiences'),
      sortProperties: [ 'id' ],
      sortAscending: true
    });
  }.property('audiences'),
});
