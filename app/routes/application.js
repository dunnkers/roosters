export default Ember.Route.extend({
	init: function () {
		var self = this;

		Ember.RSVP.hash({
			students: this.store.find('student'),
			teachers: this.store.find('teacher')
		}).then(function (items) {
			var engines = self.controllerFor('application').engines;
			var students = items.students.content;
			var teachers = items.teachers.content;

			engines.students.add(_.transform(students, function (result, item) {
				result.push({ unique:item.id, id: item.id });
				return result.push({ unique: item.get('naam'), id: item.id });
			}));
			engines.teachers.add(teachers.map(function (teacher) {
				return { unique: teacher.get('titel'), id: teacher.id };
			}));
		});
	}
});