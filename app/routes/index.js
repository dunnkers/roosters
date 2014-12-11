import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    /*return Ember.RSVP.hash({
      grades: this.store.find('grade'),
      items: this.store.find('item')
    });*/
    return this.store.find('grade');
  }
});
