import express from 'express';
import 'reflect-metadata';  // Certifique-se de que isso está presente
import clientRoutes from './routes/ClientRoutes.js';
import { AppDataSource } from './shared/infra/database/data-source.js'; // Ajuste o caminho conforme sua estrutura
import cors from 'cors';

const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());  
app.use(express.json()); // Permite que o app entenda JSON

// Inicializa a conexão com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    // Agora pode usar as rotas
    app.use(clientRoutes);

    app.listen(9000, () => {
      console.log('Server is running on port 9000');
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
