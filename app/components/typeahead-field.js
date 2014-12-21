import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],
  action: 'search',

  initializeBloodhound: function () {
    var bloodhound = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('item.title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.get('content').map(function (item) {
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

    // ensure textfield value is changed immediately
    element.on('typeahead:selected', (event, item, dataset) => {
      this.set('value', item['item.title']);
    });
  }.on('didInsertElement'),

  insertNewline: function (ev) {
    this.get('engine').get(this.get('value'), (suggestions) => {
      var suggestion = suggestions.get('firstObject');

      if (suggestion) {
        this.set('value', suggestion['item.title']);

        // send action
        var object = this.get('content').findBy('item.id', suggestion['item.id']);
        this.sendAction('search', object);
      }
    });
  }
});
