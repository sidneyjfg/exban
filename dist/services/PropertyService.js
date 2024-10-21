export class PropertyService {
    constructor(propertyRepository) {
        this.propertyRepository = propertyRepository;
    }
    // Cria um novo imóvel e salva no banco de dados
    async createProperty(data) {
        const property = await this.propertyRepository.create(data); // Cria o imóvel
        await this.propertyRepository.save(property); // Salva o imóvel no banco de dados
        console.log("Imóvel criado:", property); // Log após criação
        return property;
    }
    async getAllProperties() {
        try {
            console.log("Iniciando busca por todas as propriedades..."); // Log inicial
            const properties = await this.propertyRepository.findAll(); // Busca as propriedades
            console.log("Propriedades encontradas:", properties); // Log dos resultados
            return properties;
        }
        catch (error) {
            console.error("Erro ao buscar propriedades:", error); // Log de erro, caso algo dê errado
            throw error; // Repassa o erro para o controller tratar
        }
    }
    async getPropertyById(id) {
        return this.propertyRepository.findById(id); // Busca o imóvel pelo ID
    }
    async updateProperty(id, propertyData) {
        const property = await this.propertyRepository.findById(id); // Busca o imóvel pelo ID
        if (!property)
            return null; // Verifica se o imóvel existe
        Object.assign(property, propertyData); // Atualiza o imóvel com os novos dados
        await this.propertyRepository.save(property); // Salva as mudanças no imóvel
        return property;
    }
    async deleteProperty(id) {
        return await this.propertyRepository.delete(id); // Deleta o imóvel
    }
}
