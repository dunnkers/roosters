import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],

  // Ember cookbook: FOCUSING A TEXTFIELD AFTER IT'S BEEN INSERTED
  becomeFocused: function() {
    this.$().focus();
  }.on('didInsertElement')

});
