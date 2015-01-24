import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.Component.extend({
  tagName: 'td',
  // only single- and sibling lessons.
  classNameBindings: [ 'isNested::cell' ],
  action: 'click',

  click: function () {
    // only siblings (single) lessons
    if (!this.get('isNested')) {
      // just send the first sibling lesson.
      this.sendAction('clicked', this.get('nested.firstObject.content.firstObject'));
    }
  },

  actions: {
    lessonClicked: function (lesson) {
      this.sendAction('clicked', lesson);
    }
  },

  nested: function () {
    return groupBy(this.get('lessons'), 'subject', 'data.cluster.id' );
  }.property('lessons'),

  isNested: function () {
    return this.get('nested.length') > 1;
  }.property('nested')
});
