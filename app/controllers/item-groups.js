import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  grades: function () {
    var students = this.get('content').filterBy('type', 'Student');

    var grades = groupBy(students, 'data.grade');

    // group students in each grade by group
    grades.forEach(function (grade) {
      var groups = groupBy(grade.get('content'), 'data.group');

      // sort alphabetically
      groups = Ember.ArrayController.create({
        model: groups,
        sortProperties: [ 'data.group' ]
      });

      // overwrite grade students by the grouping
      grade.set('content', groups);
    });

    return Ember.ArrayController.create({
      model: grades,
      sortProperties: [ 'data.grade' ],
      sortAscending: false
    });
  }.property('content.@each')
});
