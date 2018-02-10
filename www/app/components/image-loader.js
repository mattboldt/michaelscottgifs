import Component from '@ember/component';
import { bind } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({

  currentImage: '',
  searchQuery: '',
  apiUrl: 'http://127.0.0.1:3000/',

  loadImage: function() {
    const url = this.get('apiUrl') + '?query=' + this.get('searchQuery');
    $.getJSON(url).then((image) => {
      bind(this, this.set('currentImage', image.url));
    });
  },

  actions: {
    search: function() {
      this.loadImage(this.get('searchQuery'));
    }
  }
});
