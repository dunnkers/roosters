import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search: function () {
      console.log('We searched!!');
    }
  }
});
