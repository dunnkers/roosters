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
      // this.sendAction('clicked', this.get('nested.firstObject.content'));
      Ember.Logger.error('Sibling lessons not supported yet!');
    }
  },

  actions: {
    lessonClicked: function (lesson) {
      Ember.Logger.debug('lesson(s) clicked!');
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
