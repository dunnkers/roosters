export default Ember.View.extend({
	templateName: function () {
		return this.get('controller').get('type') + 'Hour';
	}.property()
});