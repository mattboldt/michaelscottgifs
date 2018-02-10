'use strict';

const Fuse = require('fuse.js');

module.exports = class Search {
  constructor(json, params) {
    this.json = json;
    this.params = params;
  }

  get searchOptions(){
    return {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'titles',
        'tags'
      ]
    };
  }

  get randomImage(){
    const min = 0;
    const max = this.json.length - 1;
    const num = Math.floor(Math.random() * max) + min;
    return this.json[num];
  }

  responseBody(body){
    return {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify(body)
    };
  }

  search(){
    let query = this.params.query || '';
    if (query.length === 0) {
      return this.randomImage;
    }

    const fuse = new Fuse(this.json, this.searchOptions);
    const result = fuse.search(query);

    if (result.length === 0) {
      return this.randomImage;
    }

    return result[0];
  }

  getResults(){
    const results = this.search();
    return this.responseBody(results);
  }
}
