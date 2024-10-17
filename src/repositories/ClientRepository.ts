import { AppDataSource } from '../shared/infra/database/data-source.js';
import { Client } from '../models/Client.js';
import { IClientRepository } from './IClientRepository';

export class ClientRepository implements IClientRepository {
    private ormRepository = AppDataSource.getRepository(Client);

    public async create(data: Client): Promise<Client> {
        const newClient = this.ormRepository.create(data);
        await this.ormRepository.save(newClient);
        return newClient;
    }

    public async findByFiscalIdentifier(fiscalIdentifier: string): Promise<Client | undefined> {
      const client = await this.ormRepository.findOneBy({ fiscalIdentifier });
      return client ?? undefined; // Usa o operador de coalescência nula para converter `null` em `undefined`
    }
    
    public async findById(id: number): Promise<Client | undefined> {
      const client = await this.ormRepository.findOneBy({ id });
      return client ?? undefined; // Mesma correção aqui
    }
    public async findByEmail(email: string): Promise<Client | undefined> {
      const client = await this.ormRepository.findOneBy({ email });
      return client ?? undefined; // Mesma correção aqui
  }

    public async findAll(): Promise<Client[]> {
        return await this.ormRepository.find();
    }

    public async update(id: number, data: Partial<Client>): Promise<Client | undefined> {
      const client = await this.ormRepository.findOneBy({ id });
      if (!client) throw new Error('Client not found');

      Object.assign(client, data);
      await this.ormRepository.save(client);
      return client;
    }

    public async updateById(id: number, data: Partial<Client>): Promise<Client> {
      const client = await this.ormRepository.findOneBy({ id });
      if (!client) throw new Error('Client not found');

      Object.assign(client, data);
      await this.ormRepository.save(client);
      return client;
    }

    public async deleteByFiscalIdentifier(fiscalIdentifier: string): Promise<void> {
        const client = await this.findByFiscalIdentifier(fiscalIdentifier);
        if (!client) throw new Error("Client not found");

        await this.ormRepository.remove(client);
    }

    public async updateByFiscalIdentifier(fiscalIdentifier: string, data: Partial<Client>): Promise<Client | undefined> {
      const client = await this.ormRepository.findOneBy({ fiscalIdentifier });
      if (!client) {
        throw new Error('Client not found');
      }
  
      Object.assign(client, data);
      await this.ormRepository.save(client);
      return client;
    }

    public async deleteById(id: number): Promise<void> {
        const client = await this.findById(id);
        if (!client) throw new Error("Client not found");

        await this.ormRepository.remove(client);
    }
}
