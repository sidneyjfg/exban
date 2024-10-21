import { createConnection } from 'typeorm';
import { Client } from '../models/Client';
export const connectDatabase = async () => {
    await createConnection({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'imoveis_financiamentos_db',
        entities: [Client], // Aqui usamos a entidade diretamente
        synchronize: true, // Cria as tabelas automaticamente
        logging: true, //true  pois eu quero 
    });
};
