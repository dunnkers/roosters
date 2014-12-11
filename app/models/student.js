import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  grade: DS.attr('string'),
  group: DS.attr('string'),

  name: function () {
    return '%@ %@'.fmt(this.get('firstName'), this.get('lastName'));
  }.property('firstName', 'lastName'),

  title: function () {
    return '%@ (%@)'.fmt(
      this.get('name'), this.get('group')
    );
  }.property('name', 'group')
});
