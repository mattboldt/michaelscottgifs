import Component from '@ember/component';
import { computed } from '@ember/object';
import config from '../config/environment';
import { bind } from '@ember/runloop';
import fetch from 'ember-fetch/ajax';

export default Component.extend({

  searchQuery: '',
  apiUrl: config.APP.API_URL,

  pageTitle: computed('images', function() {
    const images = this.get('images');
    return !images ? 'index' : images[0].tags.join(' | ');
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
    fetch(url).then((images) => {
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
      this.set('images', null);
      this.loadImage(query);
    }
  }
});
