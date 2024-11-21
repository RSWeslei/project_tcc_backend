const controller = require('../controllers/unitController');

module.exports = function Routes(app){
    app.get('/product-units', controller.getAllUnits);
}