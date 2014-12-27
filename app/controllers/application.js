import Ember from 'ember';

export default Ember.ObjectController.extend({
  items: {},
  fetched: false,

  actions: {
    findItems: function () {
      if (!this.get('fetched')) {
        Ember.Logger.debug('Finding items!');

        this.set('fetched', true);
        this.set('items', this.store.find('item'));
      }
    }
  }
});
