export default DS.Model.extend({
	voornaam: DS.attr('string'),
	achternaam: DS.attr('string'),
	klas: DS.attr('string'),
	jaarlaag: DS.attr('string'),
	naam: function () {
		return this.get('voornaam') + ' ' + this.get('achternaam');
	}.property('voornaam', 'achternaam'),
	titel: function () {
		return this.get('naam') + ' (' + this.get('klas') + ')';
	}.property('naam', 'klas')
});