const knex = require('../knex');
const {md5} = require('./securityManager');

const TABLE_NAME = 'register';

module.exports = {
    async addUser (name, password) {
        const [userId] = await knex(TABLE_NAME).insert( {user: name, password: md5(password)} );
        console.log(userId);
        return userId;
    },
    findAll: () => knex(TABLE_NAME).select(),
    async findOne (name, password) {
        const [user] = await knex(TABLE_NAME)
            .select()
            .where('user', name)
            .where('password', md5(password));
        return user;
    }
};