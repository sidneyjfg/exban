import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';

export class ClientController {
  constructor(private clientService: ClientService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const client = await this.clientService.createClient(req.body);
    return res.status(201).json(client);
  }
}
