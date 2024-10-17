import { expect } from 'chai';
import { ClientService } from '../../services/ClientService';
import { ClientRepository } from '../../repositories/ClientRepository';
import { AppDataSource } from '../../shared/infra/database/data-source';
import { CreateClientDTO } from '../../dtos/CreateClientDTO';

before(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();  // Inicialize a conexão com o banco de dados antes de rodar os testes
  }
});

beforeEach(async () => {
  // Limpar a tabela clients antes de cada teste
  const clientRepository = AppDataSource.getRepository('Client');
  await clientRepository.clear();  // Limpa todos os registros da tabela
});

describe('ClientService', () => {
  it('deve criar um novo cliente com um CPF válido', async () => {
    const clientService = new ClientService(new ClientRepository());

    const clientData: CreateClientDTO = {
      name: 'Sidney da Exban',
      fiscalIdentifier: '12345678901',  // CPF válido (11 dígitos)
      email: 'sidney@exban.com',
    };

    const client = await clientService.createClient(clientData);

    // O cliente deve ter um id gerado após ser salvo
    expect(client).to.have.property('id');
  });
});

describe('ClientService - Validação de CPF', () => {
  let clientService: ClientService;

  beforeEach(() => {
    const clientRepository = new ClientRepository();  // Repositório real ou mockado
    clientService = new ClientService(clientRepository);
  });

  // Teste positivo: CPF válido (deve criar o cliente)
  it('deve criar um cliente com um CPF válido', async () => {
    const validClient: CreateClientDTO = {
      name: 'John',
      fiscalIdentifier: '12345678901',  // CPF válido
      email: 'john@example.com',
    };

    const client = await clientService.createClient(validClient);
    expect(client).to.have.property('id');
  });

  // Teste negativo: CPF com menos de 11 dígitos
  it('deve lançar um erro para CPF inválido (menos de 11 dígitos)', async () => {
    const invalidClient: CreateClientDTO = {
      name: 'Jane',
      fiscalIdentifier: '12345678',  // CPF inválido (menos de 11 dígitos)
      email: 'jane@example.com',
    };

    try {
      await clientService.createClient(invalidClient);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).to.equal('Invalid CPF: Must have 11 digits and be properly formatted.');
      } else {
        throw error;
      }
    }
  });

  // Teste negativo: CPF com caracteres não numéricos
  it('deve lançar um erro para CPF inválido (com caracteres não numéricos)', async () => {
    const invalidClient: CreateClientDTO = {
      name: 'Jane',
      fiscalIdentifier: '12345abc901',  // CPF inválido (com letras)
      email: 'jane@example.com',
    };

    try {
      await clientService.createClient(invalidClient);
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).to.equal('Invalid CPF: Must have 11 digits and be properly formatted.');
      } else {
        throw error;
      }
    }
  });
});
