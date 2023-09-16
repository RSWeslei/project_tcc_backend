const ProductType = require('../models/ProductType'); // Importe o seu modelo Sequelize

const createProductType = async (req, res) => {
  try {
    const { name } = req.body;
    const productType = await ProductType.create({ name });

    return res.status(201).json({
      success: true,
      data: productType,
      message: 'Tipo de produto criado com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao criar o tipo de produto!',
    });
  }
};

const getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll();
    return res.status(200).json({
      success: true,
      data: productTypes,
      message: 'Todos os tipos de produtos foram retornados com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: 'Erro ao retornar os tipos de produtos!',
    });
  }
}

const getProductTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Tipo de produto não encontrado',
      });
    }

    return res.status(200).json({
      success: true,
      data: productType,
      message: 'Tipo de produto recuperado com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao buscar o tipo de produto',
    });
  }
};

const updateProductType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Tipo de produto não encontrado',
      });
    }

    productType.name = name;
    await productType.save();

    return res.status(200).json({
      success: true,
      data: productType,
      message: 'Tipo de produto atualizado com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao atualizar o tipo de produto',
    });
  }
};

const deleteProductType = async (req, res) => {
  const { id } = req.params;

  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Tipo de produto não encontrado',
      });
    }

    await productType.destroy();

    return res.status(204).json({
      success: true,
      data: null,
      message: 'Tipo de produto excluído com sucesso!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Erro ao excluir o tipo de produto',
    });
  }
};

module.exports = {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType,
};
