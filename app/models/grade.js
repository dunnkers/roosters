import DS from 'ember-data';

export default DS.Model.extend({
  groups: DS.hasMany('group', { async: true }),
  clusters: DS.hasMany('cluster', { async: true })
});
