const Router = require('koa-router');

const tx = new Router();

const transactionController = require('./transactionController');

tx.post('/transfer', transactionController.transfer);
tx.post('/transferToken', transactionController.transferToken);

module.exports = tx;