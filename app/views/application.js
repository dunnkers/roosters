export default Ember.View.extend({
	didInsertElement: function () {
		var self = this;
		$('#bloodhound .typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
			name: 'students-search',
			displayKey: 'unique',
			source: Ember.studentEngine.ttAdapter()
		}, {
			name: 'teachers-search',
			displayKey: 'unique',
			source: Ember.teacherEngine.ttAdapter(),
			templates: {
				header: '<hr>'
			}
		}).on('typeahead:selected', function (event, item) {
			self.get('controller').set('searchValue', item.unique);
			self.controller.send('search');
		}).on('typeahead:autocompleted', function (event, item) {
			self.get('controller').set('searchValue', item.unique);
		}).focus();

		// move the close icon next to typeahead
		$('#bloodhound .twitter-typeahead').append($('#bloodhound .close-icon'));
	}
});