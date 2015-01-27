import Ember from 'ember';

export default Ember.Component.extend({
  href: function () {
    return '#' + this.get('group.data.group');
  }.property('group.data.group'),

  show: function () {
    var collapsible = Ember.$(this.get('href'));

    // enlarge col
    collapsible.on('show.bs.collapse', () => this.set('collapsed', true));

    // reduce col width
    collapsible.on('hide.bs.collapse', () => this.set('collapsed', false));
  }.on('didInsertElement')
});
