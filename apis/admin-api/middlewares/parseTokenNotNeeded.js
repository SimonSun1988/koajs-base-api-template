const appRoot = require('app-root-path');
const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  try {

    if (!ctx.headers || !ctx.headers.authorization) {
      ctx.state.User = null;
      return await next();
    }

    const checkFormat = /^Bearer/i.test(ctx.headers.authorization);

    if (checkFormat !== true) {
      throw new Error('1001');
    }

    const token = ctx.headers.authorization.replace(/^Bearer\s/, '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.uuid) {
      throw new Error();
    }

    return await next();
  } catch (err) {
    return ctx.throw(err);
  }
};