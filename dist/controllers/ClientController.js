export class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async create(req, res) {
        try {
            const client = await this.clientService.createClient(req.body);
            return res.status(201).json(client);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }
    async getAll(req, res) {
        try {
            console.log('Chamando o método getAll no controlador...');
            const clients = await this.clientService.getAllClients();
            return res.status(200).json(clients);
        }
        catch (error) {
            console.error('Erro no controlador getAll:', error); // Log completo do erro
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message || 'Unexpected error' });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }
    async getClientByCPF(req, res) {
        try {
            const cpf = req.query.cpf; // Garantir que cpf é tratado como string
            const client = await this.clientService.getClientByCPF(cpf);
            return client ? res.json(client) : res.status(404).json({ message: 'Cliente não encontrado' });
        }
        catch (error) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
    }
    async getClientById(req, res) {
        try {
            const client = await this.clientService.getClientById(String(req.params.id));
            return client ? res.json(client) : res.status(404).json({ message: 'Cliente não encontrado' });
        }
        catch (error) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
    }
    async updateClientById(req, res) {
        try {
            const client = await this.clientService.updateClientById(String(req.params.id), req.body);
            return res.json(client);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }
    async deleteClientById(req, res) {
        try {
            await this.clientService.deleteClientById(String(req.params.id));
            return res.status(204).json();
        }
        catch (error) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
    }
    async updateClientByCPF(req, res) {
        try {
            const client = await this.clientService.updateClientByFiscalIdentifier(req.params.cpf, req.body);
            return res.json(client);
        }
        catch (error) {
            return res.status(400).json({ message: 'Error updating client' });
        }
    }
    async deleteClientByCPF(req, res) {
        try {
            await this.clientService.deleteClientByFiscalIdentifier(req.params.cpf);
            return res.status(204).json();
        }
        catch (error) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
    }
}
