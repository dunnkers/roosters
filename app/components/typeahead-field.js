import Ember from 'ember';
// JSHint exception
/* global Bloodhound */

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],
  action: 'search',

  initializeBloodhound: function () {
    var bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('item.title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      // Make this in a way that it observes `content` and
      // adds to the typeahead automaticaly
      local: (this.get('content')|| []).map(function (item) {
          return item.getProperties('item.id', 'item.title');
      })
    });

    bloodhound.initialize().done(function () {
      Ember.Logger.debug('Suggestion engine successfully initialized.');
    }).fail(function () {
      Ember.Logger.debug('Failed to initialize suggestion engine');
    });

    this.set('engine', bloodhound);

  }.on('init'),

  // Ember cookbook: Focusing a textfield after it's been inserted
  becomeFocused: function () {
    this.$().focus();
  }.on('didInsertElement'),

  initializeTypeahead: function () {
    var element = Ember.$('.typeahead').typeahead({
      highlight: true
    }, {
      displayKey: 'item.title',
      source: this.get('engine').ttAdapter()
    });

    element.on('typeahead:selected', (event, item) => {
      // ensure component value is also set
      this.set('value', item['item.title']);

      // also bubble an action when suggestion is clicked
      this.sendSuggestion(item);
    });
  }.on('didInsertElement'),

  insertNewline: function () {
    this.get('engine').get(this.get('value'), (suggestions) => {
      var suggestion = suggestions.get('firstObject');

      if (suggestion) {
        // ensure all inputs have the same value
        this.set('value', suggestion['item.title']);
        Ember.$('.typeahead').typeahead('val', suggestion['item.title']);

        // close dropdown menu. this must be done after setting the value.
        Ember.$('.typeahead').typeahead('close');

        // send action
        this.sendSuggestion(suggestion);
      }
    });
  },

  sendSuggestion: function (suggestion) {
    var object = this.get('content').findBy('item.id', suggestion['item.id']);
    this.sendAction('search', object);
  }
});
