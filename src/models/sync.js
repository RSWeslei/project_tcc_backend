const sequelize = require('../configs/db');
const User = require('./User');
const Address = require('./Address');
const Producer = require('./Producer');
const ProductType = require('./ProductType');
const Product = require('./Product');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase().then(r => console.log('Sincronização finalizada!'));
