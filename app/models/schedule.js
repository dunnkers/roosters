import DS from 'ember-data';

export default DS.Model.extend({
  lessons: DS.hasMany('lesson'),
  item: DS.belongsTo('item', { polymorphic: true }),

  updatedAt: DS.attr('date')
});
