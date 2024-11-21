const ProductType = require('../models/ProductType');

const createProductType = async (req, res) => {
  try {
    const { name } = req.body;
    const productType = await ProductType.create({ name });

    return res.status(201).json({
      success: true,
      message: 'Tipo de produto criado com sucesso!',
      data: productType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao criar o tipo de produto!',
      data: [],
    });
  }
};

const getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.findAll();
    return res.status(200).json({
      success: true,
      message: 'Todos os tipos de produtos foram retornados com sucesso!',
      data: productTypes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao retornar os tipos de produtos!',
      data: [],
    });
  }
};

const getProductTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const productType = await ProductType.findByPk(id);

    if (!productType) {
      return res.status(404).json({
        success: false,
        message: 'Tipo de produto não encontrado',
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Tipo de produto recuperado com sucesso!',
      data: productType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar o tipo de produto',
      data: [],
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
        message: 'Tipo de produto não encontrado',
        data: [],
      });
    }

    productType.name = name;
    await productType.save();

    return res.status(200).json({
      success: true,
      message: 'Tipo de produto atualizado com sucesso!',
      data: productType,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao atualizar o tipo de produto',
      data: [],
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
        message: 'Tipo de produto não encontrado',
        data: [],
      });
    }

    await productType.destroy();

    return res.status(204).json({
      success: true,
      message: 'Tipo de produto excluído com sucesso!',
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Erro ao excluir o tipo de produto',
      data: [],
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
