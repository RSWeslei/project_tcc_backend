const Producer = require('../models/Producer');
const User = require('../models/User');
const Address = require('../models/Address');
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')

const createProducer = async (req, res) => {
    try {
        console.log(req.body);
        const { cpf, imagePath, address } = req.body;

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido',
                data: []
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const addressNumber = parseInt(address.number, 10);
        if (isNaN(addressNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Número do endereço deve ser um valor numérico válido',
                data: []
            });
        }

        const newAddress = await Address.create({
            street: address.street,
            number: addressNumber,
            complement: address.complement,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            latitude: address.latitude,
            longitude: address.longitude,
        });

        const defaultImagePath = 'uploads/userDefault.png';

        const producer = await Producer.create({
            userId,
            cpf,
            addressId: newAddress.id,
            imagePath: imagePath || defaultImagePath,
        });

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
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido',
                data: []
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const producers = await Producer.findAll({
            where: {
                userId: { [Op.ne]: userId }
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email', 'name'],
                },
                {
                    model: Address,
                    as: 'address',
                    attributes: ['id', 'street', 'number', 'complement', 'city', 'state', 'postalCode', 'longitude', 'latitude', 'region'],
                },
            ],
        });

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
