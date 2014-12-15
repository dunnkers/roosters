import DS from 'ember-data';

export default DS.Model.extend({
  grade: DS.belongsTo('grade'),
  students: DS.hasMany('student', { async: true })
});
