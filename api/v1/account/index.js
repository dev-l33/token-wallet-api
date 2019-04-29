const Router = require('koa-router');

const account = new Router();
const accountController = require('./accountController');

account.get('/balance/:address', accountController.getBalance);
account.get('/create', accountController.createAccount);

module.exports = account;