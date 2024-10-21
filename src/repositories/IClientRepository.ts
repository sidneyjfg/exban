import { Client } from '../models/Client';

// Interface para o repositório de clientes
export interface IClientRepository {
  create(data: Client): Promise<Client>;
  findAll(): Promise<Client[]>;
  findByFiscalIdentifier(fiscalIdentifier: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  findById(id: string): Promise<Client | undefined>;
  update(id: string, data: Partial<Client>): Promise<Client | undefined>;
  updateById(id: string, data: Partial<Client>): Promise<Client>;
  deleteByFiscalIdentifier(fiscalIdentifier: string): Promise<void>;
  deleteById(id: string): Promise<void>;
  updateByFiscalIdentifier(fiscalIdentifier: string, data: Partial<Client>): Promise<Client | undefined>;
}
