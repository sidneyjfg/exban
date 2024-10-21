import { Property } from '../models/Property';

export interface IPropertyRepository {
    create(propertyData: Partial<Property>): Promise<Property>;
    findAll(): Promise<Property[]>;
    findById(id: string): Promise<Property | null>;
    delete(id: string): Promise<boolean>;
    save(propertyData: Partial<Property>): Promise<Property>;
}
