const Product = require('../models/Product');
const Producer = require('../models/Producer');
const User = require('../models/User');
const { upload } = require('../middleware/upload');
const { deleteImage } = require('../middleware/upload');

const createProduct = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: 'Erro ao fazer upload da imagem!',
                data: [],
            });
        }

        try {
            const { name, description, price, producerId, typeId, status, pesticides } = req.body;
            const imagePath = req.file ? req.file.path : null;

            const product = await Product.create({
                name,
                description,
                price,
                producerId,
                imagePath,
                typeId,
                status,
                pesticides,
            });

            return res.status(201).json({
                success: true,
                message: 'Produto criado com sucesso!',
                data: product,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao criar o produto!',
                data: [],
            });
        }
    });
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: {
                model: Producer,
                as: 'producer',
                attributes: ['id', 'cpf', 'userId', 'addressId', 'imagePath'],
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email', 'name'],
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: 'Todos os produtos foram retornados com sucesso!',
            data: products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao retornar os produtos!',
            data: [],
        });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id, {
            include: {
                model: Producer,
                as: 'producer',
                attributes: ['id', 'cpf', 'userId', 'addressId'],
                include: {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'email', 'name'],
                },
            },
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado',
                data: [],
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Produto recuperado com sucesso!',
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao buscar o produto',
            data: [],
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, producerId, imagePath, typeId, status, pesticides } = req.body;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado',
                data: [],
            });
        }

        Object.assign(product, { name, description, price, producerId, imagePath, typeId, status, pesticides });
        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Produto atualizado com sucesso!',
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao atualizar o produto',
            data: [],
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado',
                data: [],
            });
        }

        if (product.imagePath) {
            deleteImage(product.imagePath);
        }

        await product.destroy();

        return res.status(200).json({
            success: true,
            message: 'Produto excluído com sucesso!',
            data: [],
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao excluir o produto',
            data: [],
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
