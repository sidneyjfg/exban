import { IPropertyRepository } from '../repositories/IPropertyRepository.js';
import { Property } from '../models/Property.js';
import { CreatePropertyDTO } from '../dtos/CreatePropertyDTO.js';

export class PropertyService {
    constructor(private propertyRepository: IPropertyRepository) {}

    // Cria um novo imóvel e salva no banco de dados
    public async createProperty(data: CreatePropertyDTO): Promise<Property> {
        const property = await this.propertyRepository.create(data); // Cria o imóvel
        await this.propertyRepository.save(property); // Salva o imóvel no banco de dados
        console.log("Imóvel criado:", property); // Log após criação

        return property;
    }

    public async getAllProperties(): Promise<Property[]> {
        try {
            console.log("Iniciando busca por todas as propriedades..."); // Log inicial
            const properties = await this.propertyRepository.findAll(); // Busca as propriedades
            console.log("Propriedades encontradas:", properties); // Log dos resultados
            return properties;
        } catch (error) {
            console.error("Erro ao buscar propriedades:", error); // Log de erro, caso algo dê errado
            throw error; // Repassa o erro para o controller tratar
        }
    }

    public async getPropertyById(id: string): Promise<Property | null> {
        return this.propertyRepository.findById(id); // Busca o imóvel pelo ID
    }

    public async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property | null> {
        const property = await this.propertyRepository.findById(id); // Busca o imóvel pelo ID
        if (!property) return null; // Verifica se o imóvel existe

        Object.assign(property, propertyData); // Atualiza o imóvel com os novos dados

        await this.propertyRepository.save(property); // Salva as mudanças no imóvel
        return property;
    }

    public async deleteProperty(id: string): Promise<boolean> {
        return await this.propertyRepository.delete(id); // Deleta o imóvel
    }
}
