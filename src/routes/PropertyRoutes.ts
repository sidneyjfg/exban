// src/routes/propertyRoutes.ts
import { Router, Request, Response } from 'express';
import { PropertyController } from '../controllers/PropertyController.js';
import { PropertyService } from '../services/PropertyService.js';
import { PropertyRepository } from '../repositories/PropertyRepository.js';

const propertyRoutes = Router();

const propertyRepository = new PropertyRepository();
const propertyService = new PropertyService(propertyRepository);
const propertyController = new PropertyController(propertyService);

// Rota para obter todos os imóveis
propertyRoutes.get('/properties', (req: Request, res: Response) => {
  propertyController.getAllProperties(req, res);
});

// Rota para criar um novo imóvel
propertyRoutes.post('/properties', (req: Request, res: Response) => {
  propertyController.createProperty(req, res);
});

// Rota para obter detalhes de um imóvel específico pelo ID
propertyRoutes.get('/properties/:id', (req: Request, res: Response) => {
  propertyController.getPropertyById(req, res);
});

// Rota para atualizar informações de um imóvel existente pelo ID
propertyRoutes.put('/properties/:id', (req: Request, res: Response) => {
  propertyController.updateProperty(req, res);
});

// Rota para excluir um imóvel pelo ID
propertyRoutes.delete('/properties/:id', (req: Request, res: Response) => {
  propertyController.deleteProperty(req, res);
});

export default propertyRoutes;
