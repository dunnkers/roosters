import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'td',
  classNameBindings: [ 'isDetailed:cell' ],
  action: 'click',

  click: function () {
    if (this.get('isDetailed')) {
      this.sendAction('clicked', this.get('lesson'));
    }
  },

  isDetailed: function () {
    return !this.get('lesson.empty') || this.get('lesson.between');
  }.property('lesson.empty', 'lesson.between')
});
