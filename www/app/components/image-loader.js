import Component from '@ember/component';
import { computed } from '@ember/object';
import config from '../config/environment';
import { bind } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({

  searchQuery: '',
  apiUrl: config.APP.API_URL,

  pageTitle: computed('query', function() {
    const q = this.get('query');
    if (q === 0) {
      return "Michael Scott Gifs";
    } else {
      return "Michael Scott Gif search: " + q;
    }
  }),

  pageImageUrl: computed('images', function() {
    const images = this.get('images');
    if (images) {
      return images[0].url;
    } else {
      return '';
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    this.set('searchQuery', this.get('query'));
    this.loadImage();
  },

  loadImage: function() {
    const url = this.get('apiUrl') + '?query=' + this.get('searchQuery');
    $.getJSON(url).then((images) => {
      bind(this, this.setImages(images));
    });
  },

  setImages(images) {
    this.set('images', images);
  },

  actions: {
    search: function() {
      const query = this.get('searchQuery');
      this.set('query', query);
      this.loadImage(query);
    }
  }
});
