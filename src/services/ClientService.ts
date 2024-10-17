import { IClientRepository } from '../repositories/IClientRepository';
import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { isValidCPF } from '../shared/infra/validator/CPFValidator';
import { Client } from '../models/Client';

export class ClientService {
  constructor(private clientRepository: IClientRepository) {}

  public async createClient(data: CreateClientDTO): Promise<Client> {
    const { fiscalIdentifier } = data;

    // Validação do CPF (verifica se tem 11 dígitos)
    if (!isValidCPF(fiscalIdentifier)) {
      throw new Error('Invalid CPF: Must have 11 digits and be properly formatted.');
    }

    // Verifica se já existe um cliente com esse CPF
    const existingClient = await this.clientRepository.findByCPF(fiscalIdentifier);
    if (existingClient) {
      throw new Error('Client with this CPF already exists.');
    }

    // Se passar todas as validações, cria o cliente
    return this.clientRepository.create(data);  // Passa diretamente o DTO
  }
}
