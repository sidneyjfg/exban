var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { expect } from 'chai';
import { ClientService } from '../../services/ClientService';
import { ClientRepository } from '../../repositories/ClientRepository';
import { AppDataSource } from '../../shared/infra/database/data-source';
before(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!AppDataSource.isInitialized) {
        yield AppDataSource.initialize(); // Inicialize a conexão com o banco de dados antes de rodar os testes
    }
}));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    // Limpar a tabela clients antes de cada teste
    const clientRepository = AppDataSource.getRepository('Client');
    yield clientRepository.clear(); // Limpa todos os registros da tabela
}));
describe('ClientService', () => {
    it('deve criar um novo cliente com um CPF válido', () => __awaiter(void 0, void 0, void 0, function* () {
        const clientService = new ClientService(new ClientRepository());
        const clientData = {
            name: 'Sidney da Exban',
            fiscalIdentifier: '12345678901', // CPF válido (11 dígitos)
            email: 'sidney@exban.com',
        };
        const client = yield clientService.createClient(clientData);
        // O cliente deve ter um id gerado após ser salvo
        expect(client).to.have.property('id');
    }));
});
describe('ClientService - Validação de CPF', () => {
    let clientService;
    beforeEach(() => {
        const clientRepository = new ClientRepository(); // Repositório real ou mockado
        clientService = new ClientService(clientRepository);
    });
    // Teste positivo: CPF válido (deve criar o cliente)
    it('deve criar um cliente com um CPF válido', () => __awaiter(void 0, void 0, void 0, function* () {
        const validClient = {
            name: 'John',
            fiscalIdentifier: '12345678901', // CPF válido
            email: 'john@example.com',
        };
        const client = yield clientService.createClient(validClient);
        expect(client).to.have.property('id');
    }));
    // Teste negativo: CPF com menos de 11 dígitos
    it('deve lançar um erro para CPF inválido (menos de 11 dígitos)', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidClient = {
            name: 'Jane',
            fiscalIdentifier: '12345678', // CPF inválido (menos de 11 dígitos)
            email: 'jane@example.com',
        };
        try {
            yield clientService.createClient(invalidClient);
        }
        catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal('Invalid CPF: Must have 11 digits and be properly formatted.');
            }
            else {
                throw error;
            }
        }
    }));
    // Teste negativo: CPF com caracteres não numéricos
    it('deve lançar um erro para CPF inválido (com caracteres não numéricos)', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidClient = {
            name: 'Jane',
            fiscalIdentifier: '12345abc901', // CPF inválido (com letras)
            email: 'jane@example.com',
        };
        try {
            yield clientService.createClient(invalidClient);
        }
        catch (error) {
            if (error instanceof Error) {
                expect(error.message).to.equal('Invalid CPF: Must have 11 digits and be properly formatted.');
            }
            else {
                throw error;
            }
        }
    }));
});
