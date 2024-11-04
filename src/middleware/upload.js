const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato de arquivo inválido. Apenas imagens são permitidas!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

const deleteImage = (imagePath) => {
    try {
        const fullPath = path.resolve(__dirname, '..', '..', imagePath);

        if (fs.existsSync(fullPath)) {
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error('Erro ao deletar a imagem:', err);
                } else {
                    console.log('Imagem deletada com sucesso!');
                }
            });
        } else {
            console.error('Imagem não encontrada:', fullPath);
        }
    } catch (error) {
        console.error('Erro ao deletar a imagem:', error);
    }
};

module.exports = { upload, deleteImage };
