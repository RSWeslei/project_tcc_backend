const controller = require('../controllers/producerController');

module.exports = function Routes(app) {
    app.get('/producer', controller.getAllProducers);
    app.get('/producer/:id', controller.getProducerById);
    app.post('/producer', controller.createProducer);
    app.put('/producer/:id', controller.updateProducer);
    app.delete('/producer/:id', controller.deleteProducer);
};
