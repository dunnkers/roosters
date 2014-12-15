import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  name: DS.attr('string'),

  title: function () {
    return '%@, %@'.fmt(this.get('id'), this.get('name'));
  }.property('id', 'name')

});
