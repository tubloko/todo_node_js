const knex = require('../knex');

const TABLE_NAME = 'tasks';

const checkTask = (id, isDone) => knex(TABLE_NAME)
    .where('taskId', id)
    .update({ done: isDone });

module.exports = {
    async getAllTask(userId) {
        const tasks = await knex(TABLE_NAME).select().where('userId', userId).orderBy('done');
        return tasks;
    },
    async addTask(task, userId) {
        await knex(TABLE_NAME).insert({task: task, createdAt: new Date(), userId: userId});
    },
    async deleteTask(id) {
        await knex(TABLE_NAME).where('taskId', id).del();
    },
    checkTask: (id) => checkTask(id, true),
    unCheckTask: (id) => checkTask(id, false),
    async deleteAllChecked(id) {
        await knex(TABLE_NAME)
            .where('userId', id)
            .where('done', 1)
            .del();
    },
};