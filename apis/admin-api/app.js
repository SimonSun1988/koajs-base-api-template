const appRoot = require('app-root-path');

const koa = require('koa');
const app = new koa();

app.proxy = true;

const interceptor = require(`${appRoot}/apis/admin-api/interceptor`);
const errorHandler = require(`${appRoot}/apis/admin-api/errorHandler`);
const middlewares = require(`${appRoot}/apis/admin-api/middlewares`);
const routers = require(`${appRoot}/apis/admin-api/routers`);

app.use(interceptor(app));
app.use(errorHandler());
app.use(middlewares(app));
app.use(routers(app));


module.exports = app;