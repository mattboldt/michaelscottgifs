import Route from '@ember/routing/route';
import config from '../config/environment';
import { inject as service } from '@ember/service';
import fetch from 'ember-fetch/ajax';
import HeadTags from './head-tags';

export default Route.extend({
  fastboot: service(),

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
    const model = controller.get('model');
    if (model) {
      return new HeadTags(this, model);
    }
  }
});
