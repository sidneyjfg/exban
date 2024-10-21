import { AppDataSource } from '../shared/infra/database/data-source.js';
import { Client } from '../models/Client.js';
export class ClientRepository {
    constructor() {
        this.ormRepository = AppDataSource.getRepository(Client);
        console.log('ClientRepository foi inicializado'); // Verifique se esse log aparece
    }
    async create(data) {
        const newClient = this.ormRepository.create(data);
        await this.ormRepository.save(newClient);
        return newClient;
    }
    async findByFiscalIdentifier(fiscalIdentifier) {
        const client = await this.ormRepository.findOneBy({ fiscalIdentifier });
        return client ?? undefined; // Usa o operador de coalescência nula para converter `null` em `undefined`
    }
    async findById(id) {
        const client = await this.ormRepository.findOneBy({ id });
        return client ?? undefined; // Mesma correção aqui
    }
    async findByEmail(email) {
        const client = await this.ormRepository.findOneBy({ email });
        return client ?? undefined; // Mesma correção aqui
    }
    async findAll() {
        console.log('Executando consulta no banco de dados...');
        const clients = await this.ormRepository.find();
        console.log('Clientes retornados do banco de dados:', clients); // Log para depuração
        return clients;
    }
    async update(id, data) {
        const client = await this.ormRepository.findOneBy({ id });
        if (!client)
            throw new Error('Client not found');
        Object.assign(client, data);
        await this.ormRepository.save(client);
        return client;
    }
    async updateById(id, data) {
        const client = await this.ormRepository.findOneBy({ id });
        if (!client)
            throw new Error('Client not found');
        Object.assign(client, data);
        await this.ormRepository.save(client);
        return client;
    }
    async deleteByFiscalIdentifier(fiscalIdentifier) {
        const client = await this.findByFiscalIdentifier(fiscalIdentifier);
        if (!client)
            throw new Error("Client not found");
        await this.ormRepository.remove(client);
    }
    async updateByFiscalIdentifier(fiscalIdentifier, data) {
        const client = await this.ormRepository.findOneBy({ fiscalIdentifier });
        if (!client) {
            throw new Error('Client not found');
        }
        Object.assign(client, data);
        await this.ormRepository.save(client);
        return client;
    }
    async deleteById(id) {
        const client = await this.findById(id);
        if (!client)
            throw new Error("Client not found");
        await this.ormRepository.remove(client);
    }
}
