/* global require */
/* global module */

const Fuse = require('fuse.js');

module.exports = class Search {
  constructor(json, params) {
    this.json = json;
    this.params = params;
  }

  get searchOptions(){
    return {
      shouldSort: true,
      tokenize: true,
      includeScore: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 90,
      minMatchCharLength: 1,
      keys: [
        { name: 'titles', weight: 0.3 },
        { name: 'tags', weight: 0.2 }
      ]
    };
  }

  get randomImage(){
    const min = 0;
    const max = this.json.length - 1;
    const num = Math.floor(Math.random() * max) + min;

    let img = this.json[num];
    img['url'] = `https://i.michaelscottgifs.com/images/${img['name']}/i.mp4`;
    return [img];
  }

  getResults(){
    let query = this.params.q || '';
    let limit = this.params.limit || 1;
    if (query.length === 0) {
      return this.randomImage;
    }

    const fuse = new Fuse(this.json, this.searchOptions);
    const results = fuse.search(query);
    let relevantResults = results.slice(0, limit);

    if (relevantResults.length > 1) {
      relevantResults = relevantResults.filter((r) => r.score <= 0.55);
    }
    if (results.length === 0 || relevantResults.length === 0) {
      return this.randomImage;
    }

    relevantResults.forEach((r) => {
      r.item['url'] = `https://i.michaelscottgifs.com/images/${r.item['name']}/i.mp4`;
    });

    return relevantResults.map((r) => r.item);
  }
}
