const Address = require('../models/Address');

const createAddress = async (req, res) => {
    try {
        const { street, number, complement, city, state, postalCode, longitude, latitude, region } = req.body;
        const address = await Address.create({ street, number, complement, city, state, postalCode, longitude, latitude, region });

        return res.status(201).json({
            success: true,
            message: 'Endereço criado com sucesso!',
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao criar o endereço!',
            data: [],
        });
    }
};

const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.findAll();
        return res.status(200).json({
            success: true,
            message: 'Todos os endereços foram retornados com sucesso!',
            data: addresses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao retornar os endereços!',
            data: [],
        });
    }
};

const getAddressById = async (req, res) => {
    const { id } = req.params;

    try {
        const address = await Address.findByPk(id);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Endereço não encontrado',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Endereço recuperado com sucesso!',
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar o endereço',
            data: [],
        });
    }
};

const updateAddress = async (req, res) => {
    const { id } = req.params;
    const { street, number, complement, city, state, postalCode, longitude, latitude, region } = req.body;

    try {
        const address = await Address.findByPk(id);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Endereço não encontrado',
                data: [],
            });
        }

        Object.assign(address, { street, number, complement, city, state, postalCode, longitude, latitude, region });
        await address.save();

        return res.status(200).json({
            success: true,
            message: 'Endereço atualizado com sucesso!',
            data: address,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao atualizar o endereço',
            data: [],
        });
    }
};

const deleteAddress = async (req, res) => {
    const { id } = req.params;

    try {
        const address = await Address.findByPk(id);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Endereço não encontrado',
                data: [],
            });
        }

        await address.destroy();

        return res.status(204).json({
            success: true,
            message: 'Endereço excluído com sucesso!',
            data: [],
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao excluir o endereço',
            data: [],
        });
    }
};

module.exports = {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress,
};
