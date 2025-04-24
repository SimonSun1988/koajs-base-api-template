const cors = require('koa2-cors');
const { koaBody } = require('koa-body');
const morgan = require('koa-morgan');

module.exports = (app) => {

  app.use(morgan('dev', {
    skip: (req, res) => {
      return req.url === '/favicon.ico';
    }
  }));

  app.use(koaBody({
    multipart: true
  }));

  app.use(cors({
    origin: function(ctx) {
      return '*'
    },
    credentials: true
  }));

  return async (ctx, next) => {
    try {
      return next();
    } catch (err) {
      return next(err);
    }
  };
};