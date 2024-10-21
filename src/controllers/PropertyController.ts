import { Request, Response } from 'express';
import { PropertyService } from '../services/PropertyService';
import { CreatePropertyDTO } from '../dtos/CreatePropertyDTO';

export class PropertyController {
    constructor(private propertyService: PropertyService) { }

    public async createProperty(req: Request, res: Response): Promise<Response>{
        try {
            const { address, value, clientId } = req.body;

            const propertyData: CreatePropertyDTO = {
                address,
                value,
                clientId,
            };
            console.log("Dados recebidos no createProperty:", req.body); // Log dos dados recebidos
            const property = await this.propertyService.createProperty(propertyData);
            console.log("Imóvel criado:", property); // Log do resultado
            return res.status(201).json(property);
        } catch (error) {
            console.error("Erro no createProperty:", error); // Log do erro
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    };

    public async getAllProperties(req: Request, res: Response) {
        try {
            const properties = await this.propertyService.getAllProperties();
            console.log("getAllProperties (PropertyController): ",properties)
            res.status(200).json(properties);
        } catch (error) {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }

    public async getPropertyById(req: Request, res: Response) {
        try {
            const property = await this.propertyService.getPropertyById(req.params.id);
            if (property) {
                res.status(200).json(property);
            } else {
                res.status(404).json({ message: 'Property not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }

    public async updateProperty(req: Request, res: Response) {
        try {
            const { address, value, clientId } = req.body;

            const propertyData: Partial<CreatePropertyDTO> = {
                address,
                value,
                clientId,
            };

            const updatedProperty = await this.propertyService.updateProperty(req.params.id, propertyData);
            if (updatedProperty) {
                res.status(200).json(updatedProperty);
            } else {
                res.status(404).json({ message: 'Property not found' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }

    public async deleteProperty(req: Request, res: Response) {
        try {
            const result = await this.propertyService.deleteProperty(req.params.id);
            if (result) {
                res.status(204).json({ message: 'Property deleted' });
            } else {
                res.status(404).json({ message: 'Property not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Unexpected error' });
        }
    }
}
