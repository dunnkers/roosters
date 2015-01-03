import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],
  action: 'search',

  // id and display key
  unique: 'id',
  displayKey: 'title',

  // Ember cookbook: Focusing a textfield after it's been inserted
  becomeFocused: function () {
    this.$().focus();
  }.on('didInsertElement'),

  initializeTypeahead: function () {
    var element = Ember.$('.typeahead').typeahead({
      highlight: true
    }, {
      displayKey: this.get('displayKey'),
      source: () => {}
    });

    element.on('typeahead:selected', (event, item) => {
      // ensure component value is also set
      this.set('value', item[this.get('displayKey')]);
    });
  }.on('didInsertElement'),

  insertNewline: function () {
    // close dropdown menu. this must be done after setting the value.
    Ember.$('.typeahead').typeahead('close');
  }
});
