const appRoot = require('app-root-path');
const Router = require('koa-router');
const router = new Router({
    prefix: '/admin-api/v0'
});

const parseToken = require(`${appRoot}/apis/admin-api/middlewares/parseToken`);
const parseTokenNotNeeded = require(`${appRoot}/apis/admin-api/middlewares/parseTokenNotNeeded`);

router.get('/healthcheck', require(`${appRoot}/apis/admin-api/routers/v0/healthcheck/check`));

module.exports = router;