export class DealController {
    constructor(dealService) {
        this.dealService = dealService;
    }
    async createDeal(req, res) {
        try {
            const { value, interestRate, status, clientId, propertyId, issueDate } = req.body;
            // Validação básica dos dados recebidos
            if (!value || !clientId || !propertyId || !issueDate) {
                return res.status(400).json({ message: 'Parâmetros inválidos. Certifique-se de enviar value, clientId, propertyId e issueDate.' });
            }
            const dealData = {
                value,
                interestRate,
                issueDate,
                clientId,
                propertyId,
                status
            };
            // Chama o serviço para criar o financiamento com validações
            const deal = await this.dealService.createDeal(dealData);
            return res.status(201).json(deal);
        }
        catch (error) {
            console.error('Erro ao criar financiamento:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao criar financiamento';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async getAllDeals(req, res) {
        try {
            const deals = await this.dealService.getAllDeals();
            return res.status(200).json(deals);
        }
        catch (error) {
            console.error('Erro ao buscar financiamentos:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao buscar financiamentos';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async getDealById(req, res) {
        try {
            const deal = await this.dealService.getDealById(req.params.id);
            if (!deal) {
                return res.status(404).json({ message: 'Financiamento não encontrado' });
            }
            return res.status(200).json(deal);
        }
        catch (error) {
            console.error('Erro ao buscar financiamento:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao buscar financiamento';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async updateDeal(req, res) {
        try {
            const deal = await this.dealService.updateDeal(req.params.id, req.body);
            if (!deal) {
                return res.status(404).json({ message: 'Financiamento não encontrado' });
            }
            return res.status(200).json(deal);
        }
        catch (error) {
            console.error('Erro ao atualizar financiamento:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao atualizar financiamento';
            return res.status(500).json({ message: errorMessage });
        }
    }
    async deleteDeal(req, res) {
        try {
            const result = await this.dealService.deleteDeal(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Financiamento não encontrado' });
            }
            return res.status(204).json();
        }
        catch (error) {
            console.error('Erro ao deletar financiamento:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao deletar financiamento';
            return res.status(500).json({ message: errorMessage });
        }
    }
}
