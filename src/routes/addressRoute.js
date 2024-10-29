const controller = require('../controllers/addressController');

module.exports = function Routes(app) {
    app.get('/address', controller.getAllAddresses);
    app.get('/address/:id', controller.getAddressById);
    app.post('/address', controller.createAddress);
    app.put('/address/:id', controller.updateAddress);
    app.delete('/address/:id', controller.deleteAddress);
};
