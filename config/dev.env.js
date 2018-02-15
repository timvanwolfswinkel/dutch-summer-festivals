'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const api = require('./api');

module.exports = merge(prodEnv, api, {
  NODE_ENV: '"development"'
});
