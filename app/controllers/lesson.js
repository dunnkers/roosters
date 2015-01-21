import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    modalHidden: function () {
      this.transitionToRoute('item');
    }
  }
});
