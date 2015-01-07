import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    didRender: function () {
      var modal = Ember.$('.lesson-modal');

      modal.on('hidden.bs.modal', () => {
        this.transitionToRoute('item');
      });

      modal.modal('show');
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
