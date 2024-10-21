import { Router } from 'express';
import { ClientController } from '../controllers/ClientController.js';
import { ClientService } from '../services/ClientService.js';
import { ClientRepository } from '../repositories/ClientRepository.js';
const clientRoutes = Router();
const clientRepository = new ClientRepository();
const clientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);
// Rota para obter todos os clientes
clientRoutes.get('/clients', (req, res) => {
    clientController.getAll(req, res);
});
// Rota para atualizar informações de um cliente existente pelo ID
clientRoutes.put('/clients/:id', (req, res) => {
    clientController.updateClientById(req, res);
});
clientRoutes.delete('/clients/:id', (req, res) => {
    clientController.deleteClientById(req, res);
});
// Rota para criação de clientes
clientRoutes.post('/clients', (req, res) => {
    clientController.create(req, res);
});
clientRoutes.get('/v1/clients', (req, res) => {
    if (req.query.cpf) {
        clientController.getClientByCPF(req, res);
    }
    else {
        res.status(400).json({ message: "CPF query parameter is required." });
    }
});
// Rota para obter detalhes de um cliente específico pelo ID
clientRoutes.get('/clients/:id', (req, res) => {
    clientController.getClientById(req, res);
});
// Rota para atualizar informações de um cliente existente pelo CPF
clientRoutes.put('/v1/clients/cpf/:cpf', (req, res) => {
    clientController.updateClientByCPF(req, res);
});
// Rota para excluir um cliente pelo CPF
clientRoutes.delete('/v1/clients/cpf/:cpf', (req, res) => {
    clientController.deleteClientByCPF(req, res);
});
export default clientRoutes;
