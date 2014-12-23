import Ember from 'ember';

export default Ember.ArrayController.extend({
  items: function () {
    return this.get('content').map(function (item) {
        return item.get('item');
    });
  }.property('content.@each.index'),

  actions: {
    search: function (param) {
      this.transitionToRoute('schedule', param);
    }
  }
});
