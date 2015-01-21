import Ember from 'ember';

export default Ember.ArrayController.extend({
  single: function () {
    return this.get('content.length') === 1;
  }.property('content')
});
