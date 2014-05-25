export default Ember.ArrayController.extend({
	searchValue: '',
	engines: {},
	init: function () {
		Ember.days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'];
		Ember.hours = ['1e', '2e', '3e', '4e', '5e', '6e', '7e', '8e'];

		var bloodhoundConfig = {
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace('unique'),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: []
		};

		this.set('engines.students', new Bloodhound(bloodhoundConfig));
		this.set('engines.teachers', new Bloodhound(bloodhoundConfig));

		for (var key in this.get('engines')) {
			this.get('engines')[key].initialize();
		}

		var self = this;
		Ember.RSVP.hash({
				students: this.store.find('student'),
				teachers: this.store.find('teacher')
			}).then(function (results) {
			self.get('engines.students').add(_.transform(results.students.content, function (result, item) {
				result.push({ unique:item.id, id: item.id });
				return result.push({ unique: item.get('naam'), id: item.id });
			}));
			self.get('engines.teachers').add(results.teachers.content.map(function (teacher) {
				return { unique: teacher.get('titel'), id: teacher.id };
			}));
		});
	},
	actions: {
		search: function () {
			var val = this.get('searchValue');
			if (!(val && val.length)) {
				return;
			}
			var self = this;

			for (var key in this.get('engines')) {
				var transitioned = false;

				this.get('engines')[key].get(val, function (suggestions) {
					if (suggestions && suggestions.length) {
						$('#bloodhound .typeahead')
						.typeahead('val', _.first(suggestions).unique)
						.typeahead('close');

						self.transitionToRoute('schedule', _.first(suggestions).id);
						transitioned = true;
					}
				});

				if (transitioned) {
					break;
				}
			}
		},
		focus: function () {
			$('#bloodhound .typeahead').typeahead('val', '');
			this.set('searchValue', '');
			$('#bloodhound .typeahead').focus();
		}
	}
});