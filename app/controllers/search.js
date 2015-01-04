import Ember from 'ember';

export default Ember.ArrayController.extend({
  cache: [],

  find: function (query, callback) {
    var time = new Date();

    this.store.find('item', { q: query, limit: 5 }).then((items) => {
      Ember.Logger.debug('Fetched items in %d ms with query: "%s".',
        new Date() - time, query);

      var results = items.map((item) => item.getProperties('item.id', 'item.title'));

      this.get('cache').push({
        query: query,
        results: results
      });

      callback(results);
    });
  },

  actions: {
    search: function (item) {
      this.transitionToRoute('item', item);
    },

    fetch: function (query, callback) {
      query = query.trim().toLowerCase();

      var cached = this.get('cache').findBy('query', query);

      if (cached) {
        return callback(cached.results);
      }

      // Wait 100 ms, allowing another find request to interrupt this one.
      Ember.run.debounce(this, this.find, query, callback, 100);
    }
  }
});
