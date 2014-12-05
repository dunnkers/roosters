import Ember from 'ember';

export default function (collection, properties) {
  var groups = [];

  (collection || []).forEach(function (item) {
    var result = Ember.Object.create({
      content: []
    });

    // populate result with properties
    properties.forEach(function (property) {
      // set to first property. e.g. 'cluster' not to 'cluster.id'
      property = property.match(/[^.]*/i)[0];

      result[property] = item.get(property);
    });

    var exists = groups.any(function (group) {
      var valid = properties.every(function (property) {
        return item.get(property) === group.get(property);
      });

      if (valid) {
        result = group;
      }

      return valid;
    });

    if (!exists) {
      groups.pushObject(result);
    }

    result.get('content').pushObject(item);
  });

  return groups;
}
