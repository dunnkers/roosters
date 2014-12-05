import DS from 'ember-data';

export default DS.Model.extend({
  day: DS.attr('number'),
  index: DS.attr('number'),

  empty: DS.attr('boolean'),
  between: DS.attr('boolean'),
  reserved: DS.attr('boolean'),

  room: DS.belongsTo('room'),
  teacher: DS.belongsTo('teacher'),
  group: DS.belongsTo('group'),
  cluster: DS.belongsTo('cluster'),

  subject: DS.attr('string'),

  schedules: DS.hasMany('schedule', { async: true }),

  audience: function () {
    if (this.get('group')) {
      return this.get('group');
    }

    return this.get('cluster');
  }.property('cluster', 'group')
});
