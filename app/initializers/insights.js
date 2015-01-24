import Insights from 'ember-insights';
import ENV from './../config/environment';

export default {
  name: 'roosters-insights',

  initialize: function() {
    Insights.configure('production').track({
      insights: {
        ALL_TRANSITIONS: true,
        ALL_ACTIONS: true
      }
    });


    if (ENV.environment === 'production') {
      Insights.start('production');
    }
  }
};
