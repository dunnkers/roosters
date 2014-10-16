import DS from 'ember-data';

export default DS.Model.extend({
  lessons: DS.hasMany('lesson', { async: true }),
  item: DS.belongsTo('item', { polymorphic: true, async: true }),

  updatedAt: DS.attr('date')
});
