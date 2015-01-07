import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    modalHidden: function () {
      this.transitionToRoute('item');
    }
  },

  dayName: function () {
    var days = [ 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag' ];

    return days[this.get('day')];
  }.property('day'),

  hour: function () {
    return this.get('index') + 1;
  }.property('index')
});
