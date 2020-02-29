const taskManager = require('../managers/taskManager');

module.exports = {
    async getAllContent(ctx) {
        const {userId} = ctx.session;
        if (!userId) {
            ctx.redirect('/login');
            return;
        }
        const tasks = await taskManager.getAllTask(userId);
        await ctx.render('index', {tasks});
    },
    async addTask(ctx) {
        const {task} = ctx.request.body;
        const {userId} = ctx.session;
        await taskManager.addTask(task, userId);
        ctx.redirect('/');
    },
    async deleteTask(ctx) {
        const {taskId} = ctx.request.body;
        await taskManager.deleteTask(taskId);
        ctx.redirect('/');
    },
    async toggleTask(ctx) {
        const {taskId, done} = ctx.request.body;
        console.log(taskId, done);
        if (done === '0') {
            await taskManager.checkTask(taskId);
        } else await taskManager.unCheckTask(taskId);

        ctx.redirect('/');
    },
    async deleteAllChecked(ctx) {
        const {userId} = ctx.session;
        await taskManager.deleteAllChecked(userId);
        ctx.redirect('/');
    },
};