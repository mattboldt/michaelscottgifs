import config from '../config/environment';

export default class HeadTags {
  constructor(route, model) {
    return [
      {
        type: 'meta',
        tagId: 'meta-title',
        attrs: {
          property: 'title',
          content: model[0].titles[0]
        }
      },
      {
        type: 'meta',
        tagId: 'og-url',
        attrs: {
          property: 'og:url',
          content: config.domain + route.get('router.url')
        }
      },
      {
        type: 'meta',
        tagId: 'og-title',
        attrs: {
          property: 'og:title',
          content: model[0].titles[0]
        }
      },
      {
        type: 'meta',
        tagId: 'og-description',
        attrs: {
          property: 'og:description',
          content: model[0].tags.join(', ')
        }
      },
      {
        type: 'meta',
        tagId: 'og-description',
        attrs: {
          property: 'og:site_name',
          content: config.siteName
        }
      },
      {
        type: 'meta',
        tagId: 'og-image',
        attrs: {
          property: 'og:image',
          content: model[0].url
        }
      }
    ]
  }
}
