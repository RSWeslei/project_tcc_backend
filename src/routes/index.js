const productTypeRoutes = require('./productTypeRoute');

function Routes(app){
    productTypeRoutes(app);
}

module.exports = Routes;