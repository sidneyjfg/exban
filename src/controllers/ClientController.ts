import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService.js';

export class ClientController {
  constructor(private clientService: ClientService) { }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const client = await this.clientService.createClient(req.body);
      return res.status(201).json(client);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Unexpected error' });
    }
  }


  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const clients = await this.clientService.getAllClients();
      return res.status(200).json(clients);
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected error' });
    }
  }

  public async getClientByCPF(req: Request, res: Response): Promise<Response> {
    try {
      const cpf = req.query.cpf as string; // Garantir que cpf é tratado como string
      const client = await this.clientService.getClientByCPF(cpf);
      return client ? res.json(client) : res.status(404).json({ message: 'Cliente não encontrado' });
    } catch (error) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
  }
  

  public async getClientById(req: Request, res: Response): Promise<Response> {
    try {
      const client = await this.clientService.getClientById(Number(req.params.id));
      return client ? res.json(client) : res.status(404).json({ message: 'Cliente não encontrado' });
    } catch (error) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
  }

  public async updateClientById(req: Request, res: Response): Promise<Response> {
    try {
      const client = await this.clientService.updateClientById(Number(req.params.id), req.body);
      return res.json(client);
    } catch (error) {
      return res.status(400).json({ message: 'Error updating client' });
    }
  }

  public async deleteClientById(req: Request, res: Response): Promise<Response> {
    try {
      await this.clientService.deleteClientById(Number(req.params.id));
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
  }

  public async updateClientByCPF(req: Request, res: Response): Promise<Response> {
    try {
      const client = await this.clientService.updateClientByFiscalIdentifier(req.params.cpf, req.body);
      return res.json(client);
    } catch (error) {
      return res.status(400).json({ message: 'Error updating client' });
    }
  }

  public async deleteClientByCPF(req: Request, res: Response): Promise<Response> {
    try {
      await this.clientService.deleteClientByFiscalIdentifier(req.params.cpf);
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
  }
}
