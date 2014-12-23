import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  index: DS.attr('number'),
  schedule: DS.belongsTo('schedule', { async: true }),

  // wrap relationship to fake polymorphism.
  item: DS.belongsTo('item', { polymorphic: true }),

  title: function () {
    return this.get('id');
  }.property('id')
});
