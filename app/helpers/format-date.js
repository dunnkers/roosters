export default Ember.Handlebars.makeBoundHelper(function (date, options) {
	 return moment(date).fromNow();
});