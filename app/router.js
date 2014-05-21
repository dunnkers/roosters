var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
	this.resource('schedule', { path: ':id' }, function() {
		this.resource('between', { path: ':day/:hour' });
	});
});

export default Router;
