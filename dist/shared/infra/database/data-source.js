import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'imoveis_financiamentos_db',
    entities: [join(__dirname, '../../../models/*.js')], // Caminho ajustado para apontar corretamente para `dist/models`
    migrations: [join(__dirname, '../../../migrations/*.js')],
    synchronize: true, // Apenas para desenvolvimento
    logging: ['query', 'error'], // Habilite logs de query e erros
});
