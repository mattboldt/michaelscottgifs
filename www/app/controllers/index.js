import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { computed } from '@ember/object';

export default Controller.extend({
  headTagsService: service('head-tags'),
  queryParams: ['q'],
  q: '',

  imagesObserver: observer('model', function() {
    this.get('headTagsService').collectHeadTags();
  }),

  pageTitle: computed('model', function() {
    const model = this.get('model');
    return !model ? 'index' : model[0].tags.join(' | ');
  }),

  pageImageUrl: computed('model', function() {
    const model = this.get('model');
    if (model) {
      return model[0].url;
    } else {
      return '';
    }
  })
});
