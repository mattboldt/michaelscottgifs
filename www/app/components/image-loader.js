import Component from '@ember/component';
import config from '../config/environment';
import { bind } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({

  currentImage: '',
  searchQuery: '',
  apiUrl: config.APP.API_URL,

  loadImage: function() {
    const url = this.get('apiUrl') + '?query=' + this.get('searchQuery') + '&limit=5';
    $.getJSON(url).then((images) => {
      bind(this, this.set('images', images));
    });
  },

  actions: {
    search: function() {
      this.loadImage(this.get('searchQuery'));
    }
  }
});
