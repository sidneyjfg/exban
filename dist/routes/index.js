export class ClientController {
    constructor(clientService) {
        this.clientService = clientService;
        this.create = this.create.bind(this); // Garante que o contexto correto seja mantido
    }
    // Método assíncrono para criar cliente
    async create(req, res) {
        try {
            const client = await this.clientService.createClient(req.body);
            return res.status(201).json(client);
        }
        catch (error) {
            // Verifica se o 'error' é uma instância de 'Error' antes de acessar suas propriedades
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
            // Caso o 'error' não seja do tipo 'Error', retorna uma resposta genérica
            return res.status(500).json({ error: 'Ocorreu um erro desconhecido.' });
        }
    }
}
