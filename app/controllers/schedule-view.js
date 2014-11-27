import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  sortProperties: [ 'group' ],
  sortAscending: false,

  rows: function () {
    return Ember.ArrayController.create({
      // group rows (days)
      model: groupBy(this.get('content'), 'index').map(function (row, index) {
        // group cells
        var days = groupBy(row.get('content'), 'day');

        // group siblings
        days = days.map(function (lesson) {
          // decide to display nested or not
          var length = lesson.get('content.length');

          // we are now on day/index level. -> we still can have multiple lessons.
          var siblings = groupBy(lesson.get('content'), 'cluster.id');

          siblings = siblings.map(function (sibling) {
            // this is lesson level.
            var content = Ember.Object.create({
              subject: sibling.get('content.firstObject.subject'),
              cluster: sibling.get('content.firstObject.cluster'),
              groups: [],
              rooms: [],
              teachers: []
            });

            sibling.get('content').forEach(function (lesson) {
              if (lesson.get('group')) content.groups.push(lesson.get('group'));
              if (lesson.get('room')) content.rooms.push(lesson.get('room'));
              if (lesson.get('teacher')) content.teachers.push(lesson.get('teacher'));
            });

            return content;
          });

          return Ember.ArrayController.create({
            model: siblings,
            sortProperties: [ 'group' ],
            sortAscending: true,
            group: lesson.group,
            nested: siblings.length > 1
          });
        });

        days.insertAt(0, Ember.Object.create({
          group: -1,
          header: true,
          index: index + 1
        }));

        return Ember.ArrayController.create({
          model: days,
          sortProperties: [ 'group' ],
          // actual day ordering
          sortAscending: true
        });
      }),
      sortProperties: [ 'group' ],
      sortAscending: true
    });
  }.property('content.@each.index')
});
