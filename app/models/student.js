import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  grade: DS.belongsTo('grade'),
  group: DS.belongsTo('group'),
  clusters: DS.hasMany('cluster'),

  title: function () {
    return '%@ %@'.fmt(this.get('firstName'), this.get('lastName'));
  }.property('firstName', 'lastName')
});
