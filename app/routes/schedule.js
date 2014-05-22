export default Ember.Route.extend({
	model: function(params) {
		var doc = this.controllerFor('schedule').resolveType(params.id);
		switch (doc) {
			case 'student':
				if (!Ember.scheduleRelations) {
					$.getJSON('https://api-roosters.rhcloud.com/studentScheduleRelations')
					.then(function (data) {
						Ember.scheduleRelations = data.relations;
					});
				}
				break;
			case 'teacher':
				params.id = params.id.toLowerCase().capitalize();
				break;
		}

		return Ember.RSVP.hash({
			schedule: this.store.find(doc + 'Schedule', params.id),
			item: this.store.find(doc, params.id)
		});
	}
});