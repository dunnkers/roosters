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
			source: Ember.teacherEngine.ttAdapter()
		}).on('typeahead:selected', function (event, item) {
			self.get('controller').set('searchValue', item.unique);
		}).on('typeahead:autocompleted', function (event, item) {
			self.get('controller').set('searchValue', item.unique);
		}).focus();
	}
});