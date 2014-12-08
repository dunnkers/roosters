import Ember from 'ember';

export default Ember.Component.extend({
  default: function () {
    return this.get('siblings.firstObject');
  }.property('siblings')
});
