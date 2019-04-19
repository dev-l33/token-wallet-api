require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const koaBody = require('koa-body');
const cors = require('@koa/cors');

// api handler
const api = require('./api');

// load environment variables
const {
  PORT: port
} = process.env;

// create app for koa
const app = new Koa();
const router = new Router();

// set logger for koa
app.use(logger());

// set CORS
app.use(cors());

// set body parser
app.use(koaBody());

// set route for api
router.use('/api', api.routes());
app.use(router.routes());
app.use(router.allowedMethods());

// listen
app.listen(port, () => {
  console.log(`TokenWalletAPI is listening to port ${port}`);
});