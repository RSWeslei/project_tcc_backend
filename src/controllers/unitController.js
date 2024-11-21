const Unit = require('../models/Unit');

const getAllUnits = async (req, res) => {
    try {
        const units = await Unit.findAll();
        return res.status(200).json({
            success: true,
            message: 'Todas as unidades foram retornadas com sucesso!',
            data: units,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro ao retornar as unidades!',
            data: [],
        });
    }
};

module.exports = {
    getAllUnits
};
