const productTypeRoutes = require('./productTypeRoute');
const userRoutes = require('./userRoute');
const addressRoutes = require('./addressRoute');
const producerRoutes = require('./producerRoute');
const productRoutes = require('./productRoute');

function Routes(app) {
    productTypeRoutes(app);
    userRoutes(app);
    addressRoutes(app);
    producerRoutes(app);
    productRoutes(app);
}

module.exports = Routes;
