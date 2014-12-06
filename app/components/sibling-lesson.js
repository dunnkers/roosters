import Ember from 'ember';

export default Ember.Component.extend({
  subject: function () {
    return this.get('siblings.firstObject.subject');
  }.property('siblings')
});
