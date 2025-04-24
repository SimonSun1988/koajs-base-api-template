const appRoot = require('app-root-path');
const Router = require('koa-router');
const router = new Router({
    prefix: '/web-api/v0'
});

const parseToken = require(`${appRoot}/apis/web-api/middlewares/parseToken`);
const parseTokenNotNeeded = require(`${appRoot}/apis/web-api/middlewares/parseTokenNotNeeded`);

router.get('/healthcheck', require(`${appRoot}/apis/web-api/routers/v0/healthcheck/check`));

module.exports = router;