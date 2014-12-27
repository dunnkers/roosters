import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions: {
    search: function (param) {
      this.transitionToRoute('item', param);
    }
  }
});
