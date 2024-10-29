const Producer = require('../models/Producer'); // Importe o seu modelo Sequelize

const createProducer = async (req, res) => {
    try {
        const { userId, cpf, addressId } = req.body;
        const producer = await Producer.create({ userId, cpf, addressId });

        return res.status(201).json({
            success: true,
            message: 'Produtor criado com sucesso!',
            data: producer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao criar o produtor!',
            data: [],
        });
    }
};

const getAllProducers = async (req, res) => {
    try {
        const producers = await Producer.findAll();
        return res.status(200).json({
            success: true,
            message: 'Todos os produtores foram retornados com sucesso!',
            data: producers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao retornar os produtores!',
            data: [],
        });
    }
};

const getProducerById = async (req, res) => {
    const { id } = req.params;

    try {
        const producer = await Producer.findByPk(id);

        if (!producer) {
            return res.status(404).json({
                success: false,
                message: 'Produtor não encontrado',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Produtor recuperado com sucesso!',
            data: producer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar o produtor',
            data: [],
        });
    }
};

const updateProducer = async (req, res) => {
    const { id } = req.params;
    const { userId, cpf, addressId } = req.body;

    try {
        const producer = await Producer.findByPk(id);

        if (!producer) {
            return res.status(404).json({
                success: false,
                message: 'Produtor não encontrado',
                data: [],
            });
        }

        Object.assign(producer, { userId, cpf, addressId });
        await producer.save();

        return res.status(200).json({
            success: true,
            message: 'Produtor atualizado com sucesso!',
            data: producer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao atualizar o produtor',
            data: [],
        });
    }
};

const deleteProducer = async (req, res) => {
    const { id } = req.params;

    try {
        const producer = await Producer.findByPk(id);

        if (!producer) {
            return res.status(404).json({
                success: false,
                message: 'Produtor não encontrado',
                data: [],
            });
        }

        await producer.destroy();

        return res.status(204).json({
            success: true,
            message: 'Produtor excluído com sucesso!',
            data: [],
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao excluir o produtor',
            data: [],
        });
    }
};

module.exports = {
    createProducer,
    getAllProducers,
    getProducerById,
    updateProducer,
    deleteProducer,
};
