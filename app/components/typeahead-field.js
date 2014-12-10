import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],
  action: 'search',

  // Ember cookbook: FOCUSING A TEXTFIELD AFTER IT'S BEEN INSERTED
  becomeFocused: function () {
    this.$().focus();
  }.on('didInsertElement'),

  initializeTypeahead: function () {
    var engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: []
    });

    engine.add([{
        name: 'dude'
      },
      {
        name: 'man'
      },
      {
        name: 'mandude'
      },
      {
        name: 'superman'
      }]);


    var element = $('.typeahead').typeahead({
      highlight: true
    }, {
      name: 'items-search',
      displayKey: 'name',
      source: engine.ttAdapter()
    });

    /*element.on('typeahead:opened', function (event, item) {
      Ember.Logger.debug('Opened event: ', event, '. For item: ', item);
    });

    element.on('typeahead:closed', function (event, item) {
      Ember.Logger.debug('Closed event: ', event, '. For item: ', item);
    });*/

    element.on('typeahead:cursorChanged', function (event, item, dataset) {
      Ember.Logger.debug('Cursor changed event: ', event,
        '. For item: ', item, '. Dataset: ', dataset);
    });

    element.on('typeahead:selected', function (event, item, dataset) {
      Ember.Logger.debug('Selected event: ', event,
        '. For item: ', item, '. Dataset: ', dataset);
    });

    element.on('typeahead:autoCompleted', function (event, item, dataset) {
      Ember.Logger.debug('Auto completed event: ', event,
        '. For item: ', item, '. Dataset: ', dataset);
    });

    engine.initialize().done(function () {
      Ember.Logger.debug('Suggestion engine successfully initialized.');
    }).fail(function () {
      Ember.Logger.debug('Failed to initialize suggestion engine');
    });
  }.on('didInsertElement')

});
