import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  grade: DS.attr('string'),
  group: DS.attr('string'),

  title: function () {
    return '%@ %@ (%@)'.fmt(
      this.get('firstName'), this.get('lastName'), this.get('group')
    );
  }.property('firstName', 'lastName', 'group')
});
