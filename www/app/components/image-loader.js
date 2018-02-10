import Component from '@ember/component';
import { bind } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({

  currentImage: '',
  searchQuery: '',
  apiUrl: 'http://127.0.0.1:3000/',

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
