import { Client } from '../models/Client';

export interface IClientRepository {
  create(data: Client): Promise<Client>;
  findByCPF(cpf: string): Promise<Client | undefined>;
}
