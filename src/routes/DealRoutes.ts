import { Router } from 'express';
import { DealController } from '../controllers/DealController.js';
import { DealService } from '../services/DealService.js';
import { DealRepository } from '../repositories/DealRepository.js';
import { PropertyRepository } from '../repositories/PropertyRepository.js'; // Certifique-se de importar o repositório de Property
import { ClientRepository } from '../repositories/ClientRepository.js';


const dealRoutes = Router();
const dealRepository = new DealRepository();
const propertyRepository = new PropertyRepository(); // Instancia o repositório de Property
const clientRepository = new ClientRepository();
const dealService = new DealService(dealRepository, propertyRepository,clientRepository);
const dealController = new DealController(dealService);

// Wrapping async methods in try-catch to avoid unhandled promise errors
dealRoutes.post('/deals', async (req, res, next) => {
  try {
    await dealController.createDeal(req, res);
  } catch (err) {
    next(err); // Let Express handle the error
  }
});

dealRoutes.get('/deals', async (req, res, next) => {
  try {
    await dealController.getAllDeals(req, res);
  } catch (err) {
    next(err);
  }
});

dealRoutes.get('/deals/:id', async (req, res, next) => {
  try {
    await dealController.getDealById(req, res);
  } catch (err) {
    next(err);
  }
});

dealRoutes.put('/deals/:id', async (req, res, next) => {
  try {
    await dealController.updateDeal(req, res);
  } catch (err) {
    next(err);
  }
});

dealRoutes.delete('/deals/:id', async (req, res, next) => {
  try {
    await dealController.deleteDeal(req, res);
  } catch (err) {
    next(err);
  }
});

export default dealRoutes;
