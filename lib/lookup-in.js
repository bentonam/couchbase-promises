'use strict';

const elv = require('elv');

const promisify = require('./promises').promisify;

const state = new WeakMap();
const me = (instance) => { return state.get(instance); };

class LookupInBuilder {
  constructor(builder) {
    if (!elv(builder))
      throw new TypeError('No native LookupInBuilder was provided.');

    state.set(this, builder);
  }

  execute(callback) {
    me(this).execute(callback);
  }

  executeAsync() {
    return promisify.call(this, this.execute);
  }

  exists(path, options) {
    me(this).exists(path, options);
    return this;
  }

  get(path, options) {
    me(this).get(path, options);
    return this;
  }

  getCount(path, options) {
    me(this).getCount(path, options);
    return this;
  }
}

module.exports = LookupInBuilder;
