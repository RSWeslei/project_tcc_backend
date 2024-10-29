const controller = require('../controllers/productController');

module.exports = function Routes(app) {
    app.get('/product', controller.getAllProducts);
    app.get('/product/:id', controller.getProductById);
    app.post('/product', controller.createProduct);
    app.put('/product/:id', controller.updateProduct);
    app.delete('/product/:id', controller.deleteProduct);
};
