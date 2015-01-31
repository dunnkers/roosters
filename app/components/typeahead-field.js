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

  // After typeahead inserted elements in DOM; we can now move this button
  moveClearIcon: function () {
    Ember.$('.close-icon').appendTo('.twitter-typeahead');
  }.on('didInsertElement'),

  initializeTypeahead: function () {
    var element = Ember.$('.typeahead').typeahead({
      highlight: true
    }, {
      displayKey: this.get('displayKey'),
      source: (query, callback) => {
        this.sendAction('fetch', query, callback);
      }
    });

    element.on('typeahead:selected', (event, item) => {
      // ensure component value is also set
      this.set('value', item[this.get('displayKey')]);

      // bubble an action when a suggestion is clicked
      this.sendAction('search', item[this.get('unique')]);
    });
  }.on('didInsertElement'),

  // bubble up an action
  insertNewline: function () {
    var value = Ember.$('.typeahead').typeahead('val');
    // ensure value is updated
    this.set('value', value);

    if (value) {
      this.sendAction('fetch', value, (suggestions) => {
        var suggestion = suggestions[0];

        if (suggestion) {
          // send action with id as param
          this.sendAction('search', suggestion[this.get('unique')]);

          var disp = suggestion[this.get('displayKey')];

          // set display-key as value
          Ember.$('.typeahead').typeahead('val', disp);

          // close dropdown menu. must be done after setting the value.
          Ember.$('.typeahead').typeahead('close');
        }
      });
    }
  }
});
