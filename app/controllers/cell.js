import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  // ordinary lesson or sibling-lesson
  single: function () {
    return this.get('content').length === 1 || this.get('nested').length === 1;
  }.property('content', 'nested'),

  lesson: function () {
    return this.get('content.firstObject');
  }.property('content'),

  nested: function () {
    return groupBy(this.get('content'), 'subject', 'data.cluster' );
  }.property('content'),

  // combine lessons into one. originally for sibling-lessons.
  combined: function () {
    // map as plain data object
    var lessons = this.get('content').map((lesson) => lesson.get('data'));

    // exit early if possible
    if (lessons.length === 1) {
      return lessons.get('firstObject');
    }

    // clone to prevent messing with lesson data
    var res = Ember.copy(lessons.get('firstObject'));

    // only combine these four core properties
    var properties = [ 'room', 'teacher', 'group', 'cluster' ];

    properties.forEach(function (property) {
      var combined = lessons.mapBy(property).compact().join(' ');

      if (combined) {
        res[property] = combined;
      }
    });

    return res;
  }.property('content')
});
