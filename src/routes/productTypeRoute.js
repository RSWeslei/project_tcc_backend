const controller = require('../controllers/productTypeController');

module.exports = function Routes(app){
    app.get('/product-types', controller.getAllProductTypes);
    app.get('/product-types/:id', controller.getProductTypeById);
    app.post('/product-types', controller.createProductType);
    app.post('/product-types/:id', controller.updateProductType);
    app.delete('/product-types/:id', controller.deleteProductType);
}