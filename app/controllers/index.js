import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: [ 'id' ],
  sortAscending: false,

  modelChanged: function() {
    Ember.run.once(this, () => {
      this.send('outletLoaded');
    });
  }.observes('model'),
});
