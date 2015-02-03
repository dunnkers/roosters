import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    // ensure we hide modal if we transition with a link
    willTransition: function () {
      var modal = Ember.$('#modal');

      if (modal) {
        modal.modal('hide');
      }
    }
  }
});
