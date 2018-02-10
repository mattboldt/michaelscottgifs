import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
  headTags: function() {
    const controller = this.controllerFor(this.routeName);
    const images = controller.get('images');
    // value of head tags updates with value of `era` on this
    // route's controller
    console.log(images);
    
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
