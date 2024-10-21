import { IClientRepository } from '../repositories/IClientRepository.js';
import { Client } from '../models/Client.js';
import { CreateClientDTO } from '../dtos/CreateClientDTO.js';
import { UpdateClientDTO } from '../dtos/UpdateClientDTO.js';
import { isValidCPF } from '../shared/infra/validator/CPFValidator.js'; // Assuma que essas funções estão implementadas corretamente

export class ClientService {
  constructor(private clientRepository: IClientRepository) { }

  public async createClient(data: CreateClientDTO): Promise<Client> {
    const { fiscalIdentifier } = data;

    // Validação do CPF
    if (!isValidCPF(fiscalIdentifier)) {
      throw new Error('CPF inválido');
    }

    // Verifica duplicação de CPF no banco de dados
    const existingClientByCPF = await this.clientRepository.findByFiscalIdentifier(fiscalIdentifier);
    if (existingClientByCPF) {
      throw new Error('CPF já registrado');
    }

    // Validação de e-mail (se necessário)
    const existingClientByEmail = await this.clientRepository.findByEmail(data.email);
    if (existingClientByEmail) {
      throw new Error('Email já registrado');
    }

    // Criação do cliente
    return this.clientRepository.create(data);
  }

  public async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  public async getClientByCPF(cpf: string): Promise<Client | undefined> {
    return await this.clientRepository.findByFiscalIdentifier(cpf);
  }

  public async getClientById(id: string): Promise<Client | undefined> {
    return await this.clientRepository.findById(id);
  }

  // Validação ao atualizar cliente
  public async updateClientById(id: string, data: UpdateClientDTO): Promise<Client | undefined> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    const { fiscalIdentifier } = data;

    // Valida o CPF durante a atualização
    if (fiscalIdentifier && !isValidCPF(fiscalIdentifier)) {
      throw new Error('CPF inválido');
    }

    if (fiscalIdentifier && fiscalIdentifier !== client.fiscalIdentifier) {
      const existingClientByCPF = await this.clientRepository.findByFiscalIdentifier(fiscalIdentifier);
      if (existingClientByCPF) {
        throw new Error('CPF já registrado');
      }
    }

    // Verifica se o e-mail já existe para outro cliente
    if (data.email && data.email !== client.email) {
      const existingClientByEmail = await this.clientRepository.findByEmail(data.email);
      if (existingClientByEmail) {
        throw new Error('Email já registrado');
      }
    }

    const updateData = {
      ...client,
      ...data
    };

    return await this.clientRepository.update(id, updateData);
  }

  public async deleteClientByFiscalIdentifier(cpf: string): Promise<void> {
    await this.clientRepository.deleteByFiscalIdentifier(cpf);
  }

  public async deleteClientById(id: string): Promise<void> {
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
