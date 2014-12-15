import Ember from 'ember';

export default Ember.TextField.extend({
  classNames: [ 'typeahead' ],
  action: 'search',

  // Ember cookbook: FOCUSING A TEXTFIELD AFTER IT'S BEEN INSERTED
  becomeFocused: function () {
    this.$().focus();
  }.on('didInsertElement'),

  initializeTypeahead: function () {
    /* BLOODHOUND */
    var engine = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.get('content')
    });

    engine.initialize().done(function () {
      Ember.Logger.debug('Suggestion engine successfully initialized.');
    }).fail(function () {
      Ember.Logger.debug('Failed to initialize suggestion engine');
    });


    /* TYPEAHEAD */
    var element = $('.typeahead').typeahead({
      highlight: true
    }, {
      displayKey: 'title',
      source: engine.ttAdapter()
    });

    var self = this;

    /*element.on('typeahead:opened', function (event, item) {
      Ember.Logger.debug('Opened event: ', event, '. For item: ', item);
    });

    element.on('typeahead:closed', function (event, item) {
      Ember.Logger.debug('Closed event: ', event, '. For item: ', item);
    });*/

    element.on('typeahead:cursorchanged', function (event, item, dataset) {
      Ember.Logger.debug('Cursor changed event: ', event,
        '. For item: ', item, '. Dataset: ', dataset);
    });

    element.on('typeahead:selected', function (event, item, dataset) {
      Ember.Logger.debug('Selected event: ', event,
        '. For item: ', item, '. Dataset: ', dataset);
      // ensure also ember's textfield value is set.
      self.set('value', item.title);
    });

    element.on('typeahead:autocompleted', function (event, item, dataset) {
      Ember.Logger.debug('Auto completed event: ', event,
        '. For item: ', item, '. Dataset: ', dataset);
    });
  }.on('didInsertElement')

});
