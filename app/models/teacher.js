export default DS.Model.extend({
	naam: DS.attr('string'),
	titel: function () {
		return this.get('id') + ', ' + this.get('naam');
	}.property('naam', 'id')
});