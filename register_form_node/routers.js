const Route = require('koa-router');
const indexController = require('./controllers/indexController');
const userController = require('./controllers/userController');

const router = new Route();

router
    .get('/', indexController.getAllContent)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .get('/login', userController.loginPage)
    .get('/logout', userController.logout)
    .post('/addTask', indexController.addTask)
    .post('/deleteTask', indexController.deleteTask)
    .post('/toggleTask', indexController.toggleTask)
    .get('/deleteAllChecked', indexController.deleteAllChecked);

module.exports = router.routes();
