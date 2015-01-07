import Ember from 'ember';

export default Ember.View.extend({
  showModal: function () {
    this.get('controller').send('didRender');
  }.on('didInsertElement')
});
