export class PropertyController {
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    async createProperty(req, res) {
        try {
            const { address, value, clientId } = req.body;
            const propertyData = {
                address,
                value,
                clientId,
            };
            console.log("Dados recebidos no createProperty:", req.body); // Log dos dados recebidos
            const property = await this.propertyService.createProperty(propertyData);
            console.log("Imóvel criado:", property); // Log do resultado
            return res.status(201).json(property);
        }
        catch (error) {
            console.error("Erro no createProperty:", error); // Log do erro
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }
    ;
    async getAllProperties(req, res) {
        try {
            const properties = await this.propertyService.getAllProperties();
            console.log("getAllProperties (PropertyController): ", properties);
            res.status(200).json(properties);
        }
        catch (error) {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }
    async getPropertyById(req, res) {
        try {
            const property = await this.propertyService.getPropertyById(req.params.id);
            if (property) {
                res.status(200).json(property);
            }
            else {
                res.status(404).json({ message: 'Property not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }
    async updateProperty(req, res) {
        try {
            const { address, value, clientId } = req.body;
            const propertyData = {
                address,
                value,
                clientId,
            };
            const updatedProperty = await this.propertyService.updateProperty(req.params.id, propertyData);
            if (updatedProperty) {
                res.status(200).json(updatedProperty);
            }
            else {
                res.status(404).json({ message: 'Property not found' });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }
    async deleteProperty(req, res) {
        try {
            const result = await this.propertyService.deleteProperty(req.params.id);
            if (result) {
                res.status(204).json({ message: 'Property deleted' });
            }
            else {
                res.status(404).json({ message: 'Property not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }
}
