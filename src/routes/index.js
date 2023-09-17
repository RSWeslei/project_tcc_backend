const productTypeRoutes = require('./productTypeRoute');
const userRoutes = require('./userRoute');

function Routes(app){
    productTypeRoutes(app);
    userRoutes(app);
}

module.exports = Routes;