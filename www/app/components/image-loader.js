import Component from '@ember/component';
import fetch from 'ember-fetch/ajax';
import config from '../config/environment';

export default Component.extend({
  searchQuery: '',

  didInsertElement() {
    this._super(...arguments);
    this.set('searchQuery', this.get('query'));
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
