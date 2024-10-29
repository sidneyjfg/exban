import { Request, Response } from 'express';
import { DealService } from '../services/DealService.js';
import { ICreateDeal } from '../interfaces/ICreateDeal.js';

export class DealController {
  constructor(private dealService: DealService) { }

  public async createDeal(req: Request, res: Response): Promise<Response> {
    try {
      const { value, interestRate, clientId, propertyId, issueDate } = req.body;
  
      // Validação básica dos dados recebidos
      if (!value || !clientId || !propertyId || !issueDate) {
        return res.status(400).json({ message: 'Parâmetros inválidos. Certifique-se de enviar value, clientId, propertyId e issueDate.' });
      }
      
      const dealData: ICreateDeal = {
        value,
        interestRate: interestRate ?? 0,  // Garante interestRate como 0 caso seja null ou undefined
        issueDate,
        clientId,
        propertyId
      };
      console.log("dealData do controller -> ",dealData )
  
      // Chama o serviço para criar o financiamento com validações
      const deal = await this.dealService.createDeal(dealData);
  
      return res.status(201).json(deal);
    } catch (error) {
      console.error('Erro ao criar financiamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao criar financiamento';
      return res.status(500).json({ message: errorMessage });
    }
  }
  
  

  public async getAllDeals(req: Request, res: Response): Promise<Response> {
    try {
      const deals = await this.dealService.getAllDeals();
      return res.status(200).json(deals);
    } catch (error) {
      console.error('Erro ao buscar financiamentos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao buscar financiamentos';
      return res.status(500).json({ message: errorMessage });
    }
  }

  public async getDealById(req: Request, res: Response): Promise<Response> {
    try {
      const deal = await this.dealService.getDealById(req.params.id);
      if (!deal) {
        return res.status(404).json({ message: 'Financiamento não encontrado' });
      }
      return res.status(200).json(deal);
    } catch (error) {
      console.error('Erro ao buscar financiamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao buscar financiamento';
      return res.status(500).json({ message: errorMessage });
    }
  }

  public async updateDeal(req: Request, res: Response): Promise<Response> {
    try {
      const deal = await this.dealService.updateDeal(req.params.id, req.body);
      if (!deal) {
        return res.status(404).json({ message: 'Financiamento não encontrado' });
      }
      return res.status(200).json(deal);
    } catch (error) {
      console.error('Erro ao atualizar financiamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao atualizar financiamento';
      return res.status(500).json({ message: errorMessage });
    }
  }

  public async deleteDeal(req: Request, res: Response): Promise<Response> {
    try {
      const result = await this.dealService.deleteDeal(req.params.id);
      if (!result) {
        return res.status(404).json({ message: 'Financiamento não encontrado' });
      }
      return res.status(204).json();
    } catch (error) {
      console.error('Erro ao deletar financiamento:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado ao deletar financiamento';
      return res.status(500).json({ message: errorMessage });
    }
  }
}
