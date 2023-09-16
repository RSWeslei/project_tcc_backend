const controller = require('../controllers/productTypeController');

module.exports = function Routes(app){
    app.get('/productType', controller.getAllProductTypes);
    app.get('/productType/:id', controller.getProductTypeById);
    app.post('/productType', controller.createProductType);
    app.post('/productType/:id', controller.updateProductType);
    app.delete('/productType/:id', controller.deleteProductType);
}