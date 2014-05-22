export default Ember.ObjectController.extend({
	type: 'student',
	handleBetween: false,
	resolveType: function (id) {
		var ret = null;
		if (Number(id)) {
			if (Number(id) > 1000) {
				ret = 'student';
				this.set('handleBetween', true);
			}else {
				// classroom
			}
		}else {
			if (/\d/g.test(id)) {
				// class
			}else {
				ret = 'teacher';
				this.set('handleBetween', false);
			}
		}

		this.set('type', ret);
		return ret;
	},
	actions: {
		between: function (i, j) {
			this.transitionToRoute('between', Ember.days[i], Ember.hours[j]);
		}
	}
});