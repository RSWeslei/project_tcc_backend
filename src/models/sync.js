const sequelize = require('../configs/db');
const User = require('./User');
const Address = require('./Address');
const Producer = require('./Producer');
const ProductType = require('./ProductType');
const Unit = require('./Unit');
const Product = require('./Product');

const insertData = async () => {
    try {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate([
            { name: 'João Silva', email: 'joao@gmail.com', passwordHash: '$2b$10$6iTAOuJSCZq94H/PjJMiVuam1/Fm8g1d5/gKrBqGL4boty1D6yxOm' },
            { name: 'Maria Oliveira', email: 'maria@gmail.com', passwordHash: '$2b$10$6iTAOuJSCZq94H/PjJMiVuam1/Fm8g1d5/gKrBqGL4boty1D6yxOm' },
            { name: 'Carlos Souza', email: 'carlos@gmail.com', passwordHash: '$2b$10$6iTAOuJSCZq94H/PjJMiVuam1/Fm8g1d5/gKrBqGL4boty1D6yxOm' },
            { name: 'Ana Pereira', email: 'ana@gmail.com', passwordHash: '$2b$10$6iTAOuJSCZq94H/PjJMiVuam1/Fm8g1d5/gKrBqGL4boty1D6yxOm' },
            { name: 'Lucas Fernandes', email: 'lucas@gmail.com', passwordHash: '$2b$10$6iTAOuJSCZq94H/PjJMiVuam1/Fm8g1d5/gKrBqGL4boty1D6yxOm' }
        ]);

        const addresses = await Address.bulkCreate([
            { street: 'Rua das Flores', number: 123, city: 'São Paulo', state: 'SP', postalCode: '12345-678', latitude: -23.550520, longitude: -46.633308 },
            { street: 'Avenida Brasil', number: 456, city: 'Rio de Janeiro', state: 'RJ', postalCode: '87654-321', latitude: -22.906847, longitude: -43.172896 },
            { street: 'Rua XV de Novembro', number: 789, city: 'Curitiba', state: 'PR', postalCode: '11223-445', latitude: -25.428356, longitude: -49.273251 },
            { street: 'Avenida Paulista', number: 101, city: 'São Paulo', state: 'SP', postalCode: '12345-000', latitude: -23.565907, longitude: -46.652932 },
            { street: 'Rua Augusta', number: 202, city: 'São Paulo', state: 'SP', postalCode: '12345-999', latitude: -23.555771, longitude: -46.658592 }
        ]);

        const producers = await Producer.bulkCreate([
            { userId: users[0].id, cpf: '123.456.789-00', addressId: addresses[0].id, imagePath: 'uploads/user.png' },
            { userId: users[1].id, cpf: '234.567.890-11', addressId: addresses[1].id, imagePath: 'uploads/user_02.png' },
            { userId: users[2].id, cpf: '345.678.901-22', addressId: addresses[2].id, imagePath: 'uploads/user_03.png' },
            { userId: users[3].id, cpf: '456.789.012-33', addressId: addresses[3].id, imagePath: 'uploads/user_02.png' },
            { userId: users[4].id, cpf: '567.890.123-44', addressId: addresses[4].id, imagePath: 'uploads/user.png' }
        ]);

        const productTypes = await ProductType.bulkCreate([
            { name: 'Frutas' },
            { name: 'Vegetais' },
            { name: 'Grãos' },
            { name: 'Laticínios' }
        ]);

        const units = await Unit.bulkCreate([
            { name: 'kg' },
            { name: 'litro' },
            { name: 'unidade' },
            { name: 'gramas' }
        ]);

        const productsData = [
            { name: 'Leite', description: 'Leite integral, fresco e saboroso.', price: 4.50, producerId: producers[0].id, typeId: productTypes[3].id, unitId: units[1].id, status: true, pesticides: false, imagePath: 'uploads/leite.jpg' },
            { name: 'Pimentão', description: 'Pimentão vermelho fresco.', price: 3.00, producerId: producers[0].id, typeId: productTypes[1].id, unitId: units[0].id, status: true, pesticides: false, imagePath: 'uploads/pimentao.jpg' },
            { name: 'Batata Doce', description: 'Batata doce rica em nutrientes.', price: 2.80, producerId: producers[1].id, typeId: productTypes[1].id, unitId: units[0].id, status: true, pesticides: true, imagePath: 'uploads/batata-doce.jpg' },
            { name: 'Cenoura', description: 'Cenouras frescas e nutritivas.', price: 3.50, producerId: producers[1].id, typeId: productTypes[1].id, unitId: units[0].id, status: true, pesticides: false, imagePath: 'uploads/cenoura.jpg' },
            { name: 'Maçã', description: 'Maçãs frescas e suculentas.', price: 5.00, producerId: producers[2].id, typeId: productTypes[0].id, unitId: units[0].id, status: true, pesticides: false, imagePath: 'uploads/maca.png' },
            { name: 'Banana', description: 'Bananas maduras, ideais para um lanche.', price: 3.00, producerId: producers[2].id, typeId: productTypes[0].id, unitId: units[0].id, status: true, pesticides: false, imagePath: 'uploads/banana.png' },
            { name: 'Alface', description: 'Alface crespa, rica em fibras.', price: 2.50, producerId: producers[3].id, typeId: productTypes[1].id, unitId: units[2].id, status: true, pesticides: true, imagePath: 'uploads/alface.jpg' },
            { name: 'Leite', description: 'Leite integral, fresco e saboroso.', price: 4.50, producerId: producers[4].id, typeId: productTypes[3].id, unitId: units[1].id, status: true, pesticides: false, imagePath: 'uploads/leite.jpg' }
        ];
        await Product.bulkCreate(productsData);

        console.log('Dados inseridos com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir os dados:', error);
    } finally {
        await sequelize.close();
    }
};

insertData().then(() => console.log('Inserção de dados finalizada!'));
