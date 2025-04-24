const appRoot = require('app-root-path');

const koa = require('koa');
const app = new koa();

app.proxy = true;

const interceptor = require(`${appRoot}/apis/web-api/interceptor`);
const errorHandler = require(`${appRoot}/apis/web-api/errorHandler`);
const middlewares = require(`${appRoot}/apis/web-api/middlewares`);
const routers = require(`${appRoot}/apis/web-api/routers`);

app.use(interceptor(app));
app.use(errorHandler());
app.use(middlewares(app));
app.use(routers(app));


module.exports = app;