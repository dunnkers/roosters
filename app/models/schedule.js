import DS from 'ember-data';

export default DS.Model.extend({
  lessons: DS.hasMany('lesson'),
  // Reflexive relation (prevents recursion) - http://bit.ly/1HxWFv5
  items: DS.hasMany('item', { async: true, inverse: null }),

  updatedAt: DS.attr('date')
});
