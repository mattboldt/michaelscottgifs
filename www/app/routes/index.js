import Route from '@ember/routing/route';
import config from '../config/environment';
import Ember from 'ember';
import fetch from 'ember-fetch/ajax';

export default Route.extend({
  fastboot: Ember.inject.service(),

  model(params) {
    const shoebox = this.get('fastboot.shoebox');
    let   shoeboxStore = shoebox.retrieve('my-store');
    const isFastBoot = this.get('fastboot.isFastBoot');
    const url = config.APP.API_URL + '?q=' + params.q;

    if (isFastBoot) {
      return fetch(url).then(function(response) {
        if (!shoeboxStore) {
          shoeboxStore = {};
          shoebox.put('my-store', shoeboxStore);
        }
        shoeboxStore['images'] = response;
        return response;
      });
    }

    return shoeboxStore && shoeboxStore['images'];
  },

  headTags: function() {
    const controller = this.controllerFor(this.routeName);
    const images = controller.get('model');
    // value of head tags updates with value of `era` on this
    // route's controller
    if (images) {
      return [
        {
          type: 'meta',
          tagId: 'meta-title',
          attrs: {
            property: 'title',
            content: images[0].titles[0]
          }
        },
        {
          type: 'meta',
          tagId: 'og-url',
          attrs: {
            property: 'og:url',
            content: config.domain + this.get('router.url')
          }
        },
        {
          type: 'meta',
          tagId: 'og-title',
          attrs: {
            property: 'og:title',
            content: images[0].titles[0]
          }
        },
        {
          type: 'meta',
          tagId: 'og-description',
          attrs: {
            property: 'og:description',
            content: images[0].tags.join(', ')
          }
        },
        {
          type: 'meta',
          tagId: 'og-description',
          attrs: {
            property: 'og:site_name”',
            content: config.siteName
          }
        },
        {
          type: 'meta',
          tagId: 'og-image”',
          attrs: {
            property: 'og:image”',
            content: images[0].url
          }
        }
      ]
    }
  }
});
