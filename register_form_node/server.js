const Koa = require('koa');
const render = require('koa-ejs');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const session = require('koa-session');
const routes = require('./routers');

const securityManager = require('./managers/securityManager');

const app = new Koa();
app.use(session({signed: false}, app));

app.use(require('koa-static')('public'));

render(app, {
    root: path.join(__dirname, 'view'),
    viewExt: 'html',
    catch: false,
    debug: false
});

app
    .use(bodyParser())
    .use(async (ctx, next) => {
        ctx.state.sessionName = ctx.session.name || '';
        const {msg, publicKey} = ctx.query;
        ctx.state.msg = securityManager.isMessageValid(msg, publicKey) ? msg : '';
        await next();
    })
    .use(routes);

app.listen(8000);


