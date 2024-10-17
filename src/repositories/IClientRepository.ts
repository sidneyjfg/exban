import { Client } from '../models/Client';

// Interface para o repositório de clientes
export interface IClientRepository {
  create(data: Client): Promise<Client>;
  findByFiscalIdentifier(fiscalIdentifier: string): Promise<Client | undefined>;
  findByEmail(email: string): Promise<Client | undefined>;
  findById(id: number): Promise<Client | undefined>;
  findAll(): Promise<Client[]>;
  update(id: number, data: Partial<Client>): Promise<Client | undefined>;
  updateById(id: number, data: Partial<Client>): Promise<Client>;
  deleteByFiscalIdentifier(fiscalIdentifier: string): Promise<void>;
  deleteById(id: number): Promise<void>;
  updateByFiscalIdentifier(fiscalIdentifier: string, data: Partial<Client>): Promise<Client | undefined>;
}
