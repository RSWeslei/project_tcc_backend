const Product = require('../models/Product');
const Producer = require('../models/Producer');
const Address = require('../models/Address');
const ProductType = require('../models/ProductType');
const Unit = require('../models/Unit');
const User = require('../models/User');
const { upload } = require('../middleware/upload');
const { deleteImage } = require('../middleware/upload');
const {Op} = require('sequelize')
const {  verify} = require('jsonwebtoken')

const createProduct = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('Token não fornecido.');
        return res.status(401).json({
            success: false,
            message: 'Token não fornecido',
            data: []
        });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const producer = await Producer.findOne({
            where: {
                userId: userId
            }
        });

        if (!producer) {
            return res.status(403).json({
                success: false,
                message: 'Usuário não possui uma conta de produtor!',
                data: [],
            });
        }

        await new Promise((resolve, reject) => {
            upload.single('imagePath')(req, res, (err) => {
                if (err) {
                    console.log('Erro no upload da imagem:', err);
                    return reject({
                        success: false,
                        message: 'Erro ao fazer upload da imagem!',
                        data: [],
                    });
                }
                resolve();
            });
        });

        const { name, description, price, typeId, unitId, status, pesticides } = req.body;

        if (!name || !description || !price || !typeId || !unitId) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios (name, description, price, typeId, unitId) devem ser preenchidos!',
                data: []
            });
        }

        const imagePath = req.file ? req.file.path : 'uploads/default-product.png';

        const product = await Product.create({
            name,
            description,
            price,
            producerId: producer.id,
            imagePath,
            typeId,
            unitId,
            status,
            pesticides,
        });

        return res.status(200).json({
            success: true,
            message: 'Produto criado com sucesso!',
            data: product,
        });

    } catch (error) {
        console.log('Erro ao criar o produto:', error);
        if (error.success === false) {
            return res.status(400).json(error);
        }
        return res.status(500).json({
            success: false,
            message: 'Erro ao criar o produto!',
            data: [],
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido',
                data: []
            });
        }

        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const products = await Product.findAll({
            include: [
                {
                    model: Producer,
                    as: 'producer',
                    required: true,
                    attributes: ['id', 'cpf', 'userId', 'addressId', 'imagePath'],
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'email', 'name'],
                        },
                        {
                            model: Address,
                            as: 'address',
                        }
                    ],
                },
                {
                    model: ProductType,
                    as: 'type',
                    attributes: ['id', 'name'],
                },
                {
                    model: Unit,
                    as: 'unit',
                    attributes: ['id', 'name'],
                }
            ],
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

const getUserProducts = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido',
                data: []
            });
        }

        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const products = await Product.findAll({
            include: [
                {
                    model: Producer,
                    as: 'producer',
                    required: true,
                    attributes: ['id', 'cpf', 'userId', 'addressId', 'imagePath'],
                    where: {
                        userId: userId
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
                        }
                    ],
                },
                {
                    model: ProductType,
                    as: 'type',
                    attributes: ['id', 'name'],
                },
                {
                    model: Unit,
                    as: 'unit',
                    attributes: ['id', 'name'],
                }
            ],
        });

        return res.status(200).json({
            success: true,
            message: 'Todos os produtos do usuário foram retornados com sucesso!',
            data: products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao retornar os produtos do usuário!',
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
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        console.log('Token não fornecido. Cancelando operação.');
        return res.status(401).json({
            success: false,
            message: 'Token não fornecido',
            data: []
        });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const producer = await Producer.findOne({
            where: {
                userId: userId
            }
        });

        if (!producer) {
            return res.status(403).json({
                success: false,
                message: 'Usuário não possui uma conta de produtor!',
                data: [],
            });
        }

        const product = await Product.findOne({
            where: {
                id: id,
                producerId: producer.id
            }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado ou não pertence ao usuário',
                data: [],
            });
        }

        await new Promise((resolve, reject) => {
            upload.single('imagePath')(req, res, (err) => {
                if (err) {
                    console.log('Erro no upload da imagem:', err);
                    return reject({
                        success: false,
                        message: 'Erro ao fazer upload da imagem!',
                        data: [],
                    });
                }
                resolve();
            });
        });

        const { name, description, price, typeId, unitId, status, pesticides } = req.body;

        const updatedData = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            typeId: typeId || product.typeId,
            unitId: unitId || product.unitId,
            status: status !== undefined ? status : product.status,
            pesticides: pesticides !== undefined ? pesticides : product.pesticides,
            imagePath: req.file ? req.file.path : product.imagePath,
        };

        Object.assign(product, updatedData);
        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Produto atualizado com sucesso!',
            data: product,
        });

    } catch (error) {
        console.log('Erro ao atualizar o produto:', error);
        if (error.success === false) {
            return res.status(400).json(error);
        }
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
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token não fornecido',
                data: []
            });
        }

        const decoded = verify(token, process.env.JWT_SECRET);
        const userId = decoded.idUser;

        const product = await Product.findOne({
            where: {
                id: id
            },
            include: {
                model: Producer,
                as: 'producer',
                where: {
                    userId: userId
                }
            }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado ou não pertence ao usuário',
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
    getUserProducts
};
