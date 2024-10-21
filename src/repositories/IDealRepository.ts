// src/interfaces/IDealRepository.ts
import { Deal } from '../models/Deal';

export interface IDealRepository {
  create(data: Partial<Deal>): Promise<Deal>;
  save(deal: Deal): Promise<Deal>;  // Certifique-se de que esse método está declarado aqui
  findAll(): Promise<Deal[]>;
  findById(id: string): Promise<Deal | null>;
  update(id: string, data: Partial<Deal>): Promise<Deal | null>;
  delete(id: string): Promise<boolean>;
}

