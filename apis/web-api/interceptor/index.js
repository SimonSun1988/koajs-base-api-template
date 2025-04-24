/*
 * 處理 response 的格式
 */

module.exports = (app) => {

  app.use(async (ctx, next) => {
    await next();

    // 過濾 CSV 和 Image 檔案
    const excludeTypes = [
      'text/csv',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
      'image/svg+xml',
      'image/webp',
    ];

    const contentType = ctx.response.headers['content-type'] || ctx.response.get('Content-Type');

    // 不包裝回應，直接傳送原始檔案
    if (contentType && excludeTypes.some(type => contentType.includes(type))) {
      return;
    }

    if (ctx.body) {
      return ctx.body = {
        status: ctx.body.errorStatus ?? ctx.status,
        code: ctx.body.errorCode ?? ctx.status,
        data: ctx.body.errorMessage ?? ctx.body,
      };
    }

    return ctx.body = {
      url: `[${ctx.method}] ${ctx.url}`,
      status: ctx.status,
      code: ctx.status,
      data: 'not found',
    };
  });

  return async (ctx, next) => {
    try {
      return next();
    } catch (err) {
      return next(err);
    }
  };
};