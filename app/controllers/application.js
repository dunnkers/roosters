export default Ember.ArrayController.extend({
	searchValue: '',
	actions: {
		search: function () {
			var val = this.get('searchValue');
			if (!(val && val.length)) {
				return;
			}
			var self = this;

			function handle (engine) {
				engine.get(val, function (suggestions) {
					if (suggestions && suggestions.length) {
						$('#bloodhound .typeahead')
						.typeahead('val', _.first(suggestions).unique)
						.typeahead('close');

						self.transitionToRoute('schedule', _.first(suggestions).id);
					}
				});
			}

			handle(Ember.studentEngine);
			handle(Ember.teacherEngine);
		},
		focus: function () {
			$('#bloodhound .typeahead').typeahead('val', '');
			this.set('searchValue', '');
			$('#bloodhound .typeahead').focus();
		}
	}
});