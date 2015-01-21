import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    outletLoaded: function () {
      this.controller.send('findItems');
    }
  }
});
