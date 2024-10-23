import { DataSource } from 'typeorm';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',  // Alterar para 'postgres', que é o nome do serviço no Docker Compose
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'imoveis_financiamentos_db',
  entities: [join(__dirname, '../../../models/*.js')], // Caminho atualizado para entidades
  migrations: [join(__dirname, '../../../migrations/*.js')], // Caminho atualizado para migrations
  synchronize: false,  // Apenas para desenvolvimento
});


