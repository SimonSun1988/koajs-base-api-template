const appRoot = require('app-root-path');
const services = require(`${appRoot}/services`);

module.exports = async (ctx, next) => {
  try {
    const result = await services.healthcheck.adminCheck();
    return ctx.body = result;
  } catch (err) {
    return ctx.throw(err);
  }
};