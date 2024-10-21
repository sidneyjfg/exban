import { Repository } from 'typeorm';
import { AppDataSource } from '../shared/infra/database/data-source.js';
import { Property } from '../models/Property.js';
import { IPropertyRepository } from './IPropertyRepository.js';

export class PropertyRepository implements IPropertyRepository {
    private repository: Repository<Property>;

    constructor() {
        this.repository = AppDataSource.getRepository(Property);
    }

    async create(propertyData: Partial<Property>): Promise<Property> {
        const property = this.repository.create(propertyData);
        return property;
    }

    async findAll(): Promise<Property[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Property | null> {
        return this.repository.findOneBy({ id });
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }

    async save(propertyData: Partial<Property>): Promise<Property> {
        return this.repository.save(propertyData);  // Usa o método save do TypeORM para persistir a entidade no banco de dados
    }
}
