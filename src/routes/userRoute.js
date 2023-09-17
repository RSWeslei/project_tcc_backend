const controller = require('../controllers/userController');

module.exports = function Routes(app){
    app.post('/signup', controller.signUp);
    app.post('/login', controller.login);
}