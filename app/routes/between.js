export default Ember.Route.extend({
	model: function(params) {
		var relations = Ember.scheduleRelations;
		if (!(relations && relations.length)) {
			return [];
		}
		var day = relations[Ember.days.indexOf(params.day)];
		if (!(day && day.length)) {
			return [];
		}
		var hour = day[Ember.hours.indexOf(params.hour)];
		var currentItem = this.modelFor('schedule').item;
		var unique = currentItem.id;
		var ids = _.without(hour, Number(unique) || unique);
		if (!ids.length) {
			return [];
		}
		var store = this.store;
		var students = ids.map(function (unique) {
			var item = store.getById('student', unique) || 
				this.store.find('student', unique);
			return {
				naam: item.get('naam'),
				klas: item.get('klas'),
				jaarlaag: item.get('jaarlaag'),
				id: item.id
			};
		});
		var filtered = [];
		_.forEach(_.groupBy(students, 'jaarlaag'), function (value, key) {
			var klasFiltered = [];
			_.forEach(_.groupBy(value, 'klas'), function (value, key) {
				klasFiltered.push({
					'klas': key,
					'students': value,
					'klas_id': '#' + key
				});
			});

			filtered.push({
				'jaarlaag': key,
				'jaarlaag_id': '#' + key,
				'jaarlaag_klassen': key + 'klassen',
				'jaarlaag_klassen_id': '#' + key + 'klassen',
				'klassen': klasFiltered,
				'eigen_jaarlaag': currentItem.get('jaarlaag') === key ? true : false
			});
		});
		filtered = _.sortBy(filtered, function (filter) {
			return filter.jaarlaag.charAt(2);
		});
		filtered.reverse();
		return filtered;
	}
});