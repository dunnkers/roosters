import Ember from 'ember';

export default Ember.ObjectController.extend({
  items: {},
  fetched: false,

  actions: {
    findItems: function () {
      if (!this.get('fetched')) {
        Ember.Logger.debug('Finding items!');

        this.set('fetched', true);
        Ember.run.next(this, function () {
          this.store.find('item').then((items) => {
            this.set('items', items);
          });
        });
      }
    }
  }
});
