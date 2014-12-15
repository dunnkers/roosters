import Ember from 'ember';

export default Ember.ArrayController.extend({
  items: function () {
    return this.get('content').map(function (item) {
        return item.get('item').getProperties('id', 'title');
    });
  }.property('content.@each.index')
});
