export default Ember.Route.extend({
	init: function () {
		Ember.days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'];
		Ember.hours = ['1e', '2e', '3e', '4e', '5e', '6e', '7e', '8e'];

		var bloodhoundConfig = {
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('unique'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: []
		};
		Ember.studentEngine = new Bloodhound(bloodhoundConfig);
		Ember.studentEngine.initialize();
		Ember.teacherEngine = new Bloodhound(bloodhoundConfig);
		Ember.teacherEngine.initialize();
		Ember.RSVP.hash({
				students: this.store.find('student'),
				teachers: this.store.find('teacher')
			}).then(function (results) {
			Ember.studentEngine.add(_.transform(results.students.content, function (result, item) {
				result.push({ unique:item.id, id: item.id });
				return result.push({ unique: item.get('naam'), id: item.id });
			}));
			Ember.teacherEngine.add(results.teachers.content.map(function (teacher) {
				return { unique: teacher.get('titel'), id: teacher.id };
			}));
		});
	}
});