import { AppDataSource } from '../shared/infra/database/data-source.js';
import { Property } from '../models/Property.js';
export class PropertyRepository {
    constructor() {
        this.repository = AppDataSource.getRepository(Property);
    }
    async create(propertyData) {
        const property = this.repository.create(propertyData);
        return property;
    }
    async findAll() {
        return this.repository.find();
    }
    async findById(id) {
        return this.repository.findOneBy({ id });
    }
    async delete(id) {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
    async save(propertyData) {
        return this.repository.save(propertyData); // Usa o método save do TypeORM para persistir a entidade no banco de dados
    }
}
