import 'dotenv/config';  // Carrega variáveis de ambiente do arquivo .env
import { DataSource } from 'typeorm';
import { Client } from '../../../models/Client';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'imoveis_financiamentos_db',
  entities: [Client],  // entidades
  synchronize: true,  // Apenas para desenvolvimento
  logging: false,
});
