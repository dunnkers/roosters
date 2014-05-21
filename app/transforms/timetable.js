export default DS.Transform.extend({
	deserialize: function(value) {
		value = value.map(function(dag, i) {
			return dag.map(function(uur, j){
				uur.i = i;
				uur.j = j;
				var nested = [];
				_.forIn(uur, function (value, key) {
					if (Number(key) || Number(key) === 0) {
						nested.push(value);
					}
				});
				if (nested.length) {
					uur.nested = nested;
				}
				return uur;
			});
		});

		value.unshift(['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8'].map(function(uur) {
			return { uur: uur };
		}));

		return _.zip(value);
	}
});