import express from 'express';
import { connectDatabase } from './config/database';
const app = express();
const startServer = async () => {
    try {
        await connectDatabase();
        console.log('Conectado ao banco de dados com sucesso!');
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados', error);
    }
};
startServer();
