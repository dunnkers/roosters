import DS from 'ember-data';
import Item from './item';

export default Item.extend({
  grade: DS.belongsTo('grade'),
  students: DS.hasMany('student', { async: true, inverse: 'group' })
});
