const qs = require('qs');
const userManager = require('../managers/userManager');
const securityManager = require('../managers/securityManager');

module.exports = {
    async logout(ctx) {
        ctx.session = {};
        ctx.redirect('/');
    },
    async loginPage(ctx) {
        await ctx.render('loginPage',{ name: ctx.query.name || '', title: 'login/Register' });
    },
    async login(ctx) {
        const {name, password} = ctx.request.body;
        const {userId} = await userManager.findOne(name, password);
        ctx.session.userId = userId;
        ctx.session.name = name;
        ctx.redirect('/');
    },
    async register(ctx) {
        const {name, password} = ctx.request.body;
        let msg = '';
        try {
            ctx.session.userId = await userManager.addUser(name, password);
        } catch (e) {
            console.log(e);
            msg = 'Duplicate name';
            const queryString = qs.stringify({
                msg,
                publicKey: securityManager.makePublicKey(msg),
                name,
            });
            ctx.redirect(`/login?${queryString}`);
            return;
        }
        ctx.session.name = name;
        ctx.redirect('/');
    },
};
