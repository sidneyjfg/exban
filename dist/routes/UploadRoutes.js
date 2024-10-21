import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UploadRoutes = express.Router();
// Configuração do multer para salvar as imagens em uma pasta local
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads'); // Diretório correto para salvar as imagens
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nome único para cada imagem
    }
});
const upload = multer({ storage });
// Rota para upload de imagem
UploadRoutes.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log('Nenhuma imagem foi enviada.');
        res.status(400).json({ message: 'Nenhuma imagem foi enviada.' });
        return; // Aqui garantimos que a função termine retornando void
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    console.log('URL da imagem salva:', imageUrl); // Log do caminho da imagem
    // Retorne a URL da imagem salva
    res.status(200).json({ imageUrl });
});
export default UploadRoutes;
