import Ember from 'ember';
// JSHint exception
/* global Bloodhound */

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],
  action: 'search',

  // id and display key
  id: 'id',
  title: 'title',

  contentChanged: function () {
    Ember.Logger.debug('Feeding BloodHound with data...');
    var time = new Date();

    this.get('engine').add(this.get('items'));
    
    Ember.Logger.debug('BloodHound fed -', new Date() - time, 'ms');
  }.observes('content'),

  items: function () {
    return (this.get('content') || []).map((item) => {
      return item.getProperties(this.get('id'), this.get('title'));
    });
  }.property('content'),

  initializeBloodhound: function () {
    var bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace(this.get('title')),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.get('items')
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
      displayKey: this.get('title'),
      source: this.get('engine').ttAdapter()
    });

    element.on('typeahead:selected', (event, item) => {
      // ensure component value is also set
      this.set('value', item[this.get('title')]);

      // also bubble an action when suggestion is clicked
      this.sendSuggestion(item);
    });
  }.on('didInsertElement'),

  insertNewline: function () {
    this.get('engine').get(this.get('value'), (suggestions) => {
      var suggestion = suggestions.get('firstObject');

      if (suggestion) {
        // ensure all inputs have the same value
        this.set('value', suggestion[this.get('title')]);
        Ember.$('.typeahead').typeahead('val', suggestion[this.get('title')]);

        // close dropdown menu. this must be done after setting the value.
        Ember.$('.typeahead').typeahead('close');

        // send action
        this.sendSuggestion(suggestion);
      }
    });
  },

  sendSuggestion: function (suggestion) {
    var object = this.get('content').findBy(this.get('id'),
      suggestion[this.get('id')]);

    this.sendAction('search', object);
  }
});
