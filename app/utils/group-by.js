import Ember from 'ember';

// Group-by
// http://discuss.emberjs.com/t/ember-enumerable-no-group-by/3594/5
// https://github.com/embersherpa/examples/blob/master/app/utils/group-by.js

export default function groupBy (collection, property) {
  var result = [];

  (collection || []).forEach(function (item) {
    var index = item.get(property);

    if (!result.findBy('group', index)) {
      result.pushObject(Ember.Object.create({
        group: index,
        content: []
      }));
    }

    result.findBy('group', index).get('content').pushObject(item);
  });

  return result;
}

/*export default function (groupBy) {
  var dependentKey = 'content.@each.' + groupBy;

  return Ember.computed(dependentKey, function(){
    var result = [];

    this.get('content').forEach(function(item){
      var hasGroup = !!result.findBy('group', get(item, groupBy));

      if (!hasGroup) {
        result.pushObject(Ember.Object.create({
          group: get(item, groupBy),
          content: []
        }));
      }

      result.findBy('group', get(item, groupBy)).get('content').pushObject(item);
    });

    return result;
  });
}*/
