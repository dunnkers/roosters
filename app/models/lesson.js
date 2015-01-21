import DS from 'ember-data';

export default DS.Model.extend({
  day: DS.attr('number'),
  index: DS.attr('number'),

  empty: DS.attr('boolean'),
  between: DS.attr('boolean'),
  reserved: DS.attr('boolean'),

  room: DS.belongsTo('room', { async: true }),
  teacher: DS.belongsTo('teacher', { async: true }),
  group: DS.belongsTo('group', { async: true }),
  cluster: DS.belongsTo('cluster', { async: true }),

  subject: DS.attr('string'),

  audience: DS.belongsTo('audience', { async: true })
});
