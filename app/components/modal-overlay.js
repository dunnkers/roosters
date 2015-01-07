import Ember from 'ember';

export default Ember.Component.extend({
  action: 'modalHidden',

  show: function () {
    var modal = Ember.$('#modal');

    modal.on('hidden.bs.modal', () => {
      this.sendAction();
    });

    modal.modal('show');
  }.on('didInsertElement')
});
