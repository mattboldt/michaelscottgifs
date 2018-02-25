import Component from '@ember/component';
import fetch from 'ember-fetch/ajax';
import config from '../config/environment';

export default Component.extend({
  searchQuery: '',

  init() {
    this._super(...arguments);
    this.set('searchQuery', this.get('q'));
  },

  actions: {
    search: function() {
      const query = this.get('searchQuery');
      this.set('q', query);

      const url = config.APP.API_URL + '?q=' + query;
      fetch(url).then((response) => {
        this.set('model', response);
      });
    }
  }
});
