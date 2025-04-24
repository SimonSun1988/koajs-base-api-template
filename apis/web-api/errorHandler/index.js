const appRoot = require('app-root-path');

const errorFormat = require(`${appRoot}/apis/web-api/errorHandler/errorFormat`);
const PrettyError = require('pretty-error');
const prettyError = new PrettyError();
prettyError.withoutColors();
prettyError.skipPackage(
  'koa-compose',
  'koa-router',
  'koa2-cors',
  'koa-body',
  'koa-logger',
  'jsonwebtoken',
  'bluebird'
);

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {

      const sequelizeValidationError = err.name === 'SequelizeValidationError' ? {
        code: -99,
        status: 503,
        message: err.errors[0]?.message
      } : null;

      const customError = errorFormat[err.message] ?? sequelizeValidationError ?? errorFormat['-1'];

      const errorResponse = {};
      errorResponse.errorCode = customError.code;
      errorResponse.errorStatus = customError.status;
      errorResponse.errorMessage = customError.message;

      if (customError.code !== null || undefined) {
        console.log(`---------- ERROR ----------`);
        console.log(`code: ${errorResponse.errorCode}`);
        console.log(`message: ${errorResponse.errorMessage}`);
        console.log(`status: ${errorResponse.errorStatus}`);
        console.log(`stack:`);
        console.log(prettyError.render(err));
        console.log(`---------- ERROR ----------`);
      }

      ctx.status = errorResponse.errorStatus;
      return (ctx.body = errorResponse);
    }
  };
};