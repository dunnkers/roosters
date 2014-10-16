import DS from 'ember-data';

export default DS.Model.extend({
  students: DS.hasMany('student', { async: true })
});
