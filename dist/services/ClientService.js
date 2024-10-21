import { isValidCPF } from '../shared/infra/validator/CPFValidator.js'; // Assuma que essas funções estão implementadas corretamente
export class ClientService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async createClient(data) {
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
    async getAllClients() {
        return await this.clientRepository.findAll();
    }
    async getClientByCPF(cpf) {
        return await this.clientRepository.findByFiscalIdentifier(cpf);
    }
    async getClientById(id) {
        return await this.clientRepository.findById(id);
    }
    // Validação ao atualizar cliente
    async updateClientById(id, data) {
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
    async deleteClientByFiscalIdentifier(cpf) {
        await this.clientRepository.deleteByFiscalIdentifier(cpf);
    }
    async deleteClientById(id) {
        await this.clientRepository.deleteById(id);
    }
    async updateClientByFiscalIdentifier(cpf, data) {
        const client = await this.clientRepository.findByFiscalIdentifier(cpf);
        if (!client) {
            throw new Error('Cliente não econtrado');
        }
        return await this.clientRepository.updateByFiscalIdentifier(cpf, data);
    }
    async deleteClientByCPF(cpf) {
        await this.clientRepository.deleteByFiscalIdentifier(cpf);
    }
}
