import Ember from 'ember';
import groupBy from '../utils/group-by';

export default Ember.ArrayController.extend({
  types: function () {

    var types = groupBy(this.get('content'), 'type');

    types = types.map(function (type) {
      var groups = groupBy(type.get('content'), 'data.group');

      // if no groups, create -one- group with type as name
      if (groups.length === 1) {
        groups.set('firstObject.data.group', type.get('type'));
      }

      groups = groups.map(function (group) {
        // prefix id with # to create a href for collapsing
        group.set('href', '#' + group.get('data.group'));

        return group;
      });

      type.set('content', groups);

      return type;
    });

    return Ember.ArrayController.create({
      model: types,
      sortProperties: [ 'type' ],
      sortAscending: false
    });
  }.property('content.@each')
});
