
const Router = require('koa-router');
const account = require('./account');
const tx = require('./transaction');

const api = new Router();

api.use('/account', account.routes());
api.use('/transaction', tx.routes());

module.exports = api;