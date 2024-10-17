import { IClientRepository } from '../repositories/IClientRepository.js';
import { Client } from '../models/Client.js';
import { CreateClientDTO, UpdateClientDTO } from '../dtos/CreateClientDTO.js';
import { isValidCPF } from '../shared/infra/validator/CPFValidator.js'; // Assuma que essas funções estão implementadas corretamente
import { isValidEmail } from '../shared/infra/validator/EmailValidator.js'; // Assuma que essas funções estão implementadas corretamente

export class ClientService {
  constructor(private clientRepository: IClientRepository) { }

  public async createClient(data: CreateClientDTO): Promise<Client> {
    const { fiscalIdentifier } = data;

    if (!isValidCPF(fiscalIdentifier)) {
      throw new Error('CPF inválido');
    }
    const existingClientByCPF = await this.clientRepository.findByFiscalIdentifier(data.fiscalIdentifier);
    if (existingClientByCPF) {
      throw new Error('CPF já registrado!');
    }

    // Validação do E-mail
    const existingClientByEmail = await this.clientRepository.findByEmail(data.email);
    if (existingClientByEmail) {
      throw new Error('Email já utilizado!.');
    }

    return this.clientRepository.create(data);
  }

  public async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  public async getClientByCPF(cpf: string): Promise<Client | undefined> {
    return await this.clientRepository.findByFiscalIdentifier(cpf);
  }

  public async getClientById(id: number): Promise<Client | undefined> {
    return await this.clientRepository.findById(id);
  }

  public async updateClientById(id: number, data: UpdateClientDTO): Promise<Client | undefined> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    const updateData = {
      ...client, // Spread the existing data
      ...data // Override with new data
    };

    return await this.clientRepository.update(id, updateData);
  }

  public async deleteClientByFiscalIdentifier(cpf: string): Promise<void> {
    await this.clientRepository.deleteByFiscalIdentifier(cpf);
  }

  public async deleteClientById(id: number): Promise<void> {
    await this.clientRepository.deleteById(id);
  }
  public async updateClientByFiscalIdentifier(cpf: string, data: UpdateClientDTO): Promise<Client | undefined> {
    const client = await this.clientRepository.findByFiscalIdentifier(cpf);
    if (!client) {
      throw new Error('Cliente não econtrado');
    }
    return await this.clientRepository.updateByFiscalIdentifier(cpf, data);
  }

  public async deleteClientByCPF(cpf: string): Promise<void> {
    await this.clientRepository.deleteByFiscalIdentifier(cpf);
  }

}
