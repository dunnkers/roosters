import DS from 'ember-data';

export default DS.Model.extend({
  lessons: DS.hasMany('lesson'),
  // items: DS.hasMany('item', { async: true }),

  updatedAt: DS.attr('date')
});
