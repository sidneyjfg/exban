import { AppDataSource } from '../shared/infra/database/data-source';
import { Client } from '../models/Client';
import { CreateClientDTO } from '../dtos/CreateClientDTO';

export class ClientRepository {
  private ormRepository = AppDataSource.getRepository(Client);

  public async create(data: CreateClientDTO): Promise<Client> {
    // Cria uma instância do Client sem o ID (usando apenas o DTO)
    const newClient = this.ormRepository.create(data);
    
    // Salva o cliente no banco de dados (o ID será gerado automaticamente pelo banco)
    await this.ormRepository.save(newClient);
    
    // Retorna o cliente com o ID gerado
    return newClient;
  }

  public async findByCPF(cpf: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { fiscalIdentifier: cpf } });
    return client ?? undefined;
  }
}
