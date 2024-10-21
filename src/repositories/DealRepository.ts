import { Repository } from 'typeorm';
import { AppDataSource } from '../shared/infra/database/data-source.js';
import { Deal } from '../models/Deal.js';
import { IDealRepository } from '../repositories/IDealRepository.js';

export class DealRepository implements IDealRepository {
  private repository: Repository<Deal>;

  constructor() {
    this.repository = AppDataSource.getRepository(Deal);
  }

  // Implementação do método save
  async save(deal: Deal): Promise<Deal> {
    return this.repository.save(deal);  // Salva ou atualiza o Deal no banco de dados
  }

  // Criação de uma nova negociação
  async create(data: Partial<Deal>): Promise<Deal> {
    const deal = this.repository.create(data);  // Cria a entidade Deal
    return this.save(deal);                     // Salva o Deal chamando o método save
  }

  async findAll(): Promise<Deal[]> {
    return this.repository.find({ relations: ['property', 'client'] });
  }

  async findById(id: string): Promise<Deal | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['property', 'client'],
    });
  }

  async update(id: string, data: Partial<Deal>): Promise<Deal | null> {
    const deal = await this.findById(id);
    if (!deal) return null;

    Object.assign(deal, data);
    return this.save(deal);  // Usa o método save aqui também
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
