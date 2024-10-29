import { IDealRepository } from '../repositories/IDealRepository.js';
import { IPropertyRepository } from '../repositories/IPropertyRepository.js';
import { IClientRepository } from '../repositories/IClientRepository.js';
import { Deal } from '../models/Deal.js';
import { ICreateDeal } from '../interfaces/ICreateDeal.js';

export class DealService {
  constructor(
    private dealRepository: IDealRepository,
    private propertyRepository: IPropertyRepository,
    private clientRepository: IClientRepository
  ) { }

  public async createDeal(data: ICreateDeal): Promise<Deal> {
    const property = await this.propertyRepository.findById(data.propertyId);
    if (!property) {
      throw new Error('Imóvel não encontrado.');
    }
  
    const client = await this.clientRepository.findById(data.clientId);
    if (!client) {
      throw new Error('Cliente não encontrado.');
    }
  
    // Validação para garantir que o valor de entrada seja no mínimo 20% do valor total do imóvel
    const minimumDownPayment = property.value * 0.2;
    if (data.value < minimumDownPayment) {
      throw new Error(`O valor de entrada deve ser no mínimo 20% do valor total do imóvel, que é R$ ${minimumDownPayment.toFixed(2)}.`);
    }
  
    // Converte issueDate para Date
    const issueDate = new Date(data.issueDate);
  
    // Validação da data de emissão (issueDate) entre 1 e 5 dias no futuro
    const today = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
  
    // Definir minDate como o início do próximo dia (00:00:00 UTC)
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    minDate.setUTCHours(0, 0, 0, 0);  // Garantir que esteja no início do dia (00:00:00)
  
    // Definir maxDate como o final do quinto dia (23:59:59 UTC)
    const maxDate = new Date(minDate.getTime() + 4 * oneDay + (23 * 60 * 60 * 1000) + (59 * 60 * 1000) + (59 * 1000));
    maxDate.setUTCHours(23, 59, 59, 999);  // Definir para o final do quinto dia no futuro (23:59:59 UTC)
  
    if (issueDate < minDate || issueDate > maxDate) {
      throw new Error(
        `A data de emissão (issueDate) deve estar entre ${minDate.toISOString().split('T')[0]} e ${maxDate.toISOString().split('T')[0]}.`
      );
    }
    
    const interestRate = data.interestRate;
    if (interestRate === undefined || interestRate === null) {
      throw new Error('A taxa de juros (interestRate) é obrigatória.');
    }

    const value = data.value;
    // Criação do financiamento com cliente e imóvel
    const deal = await this.dealRepository.create({
      value,
      interestRate,
      property,           // A entidade Property
      client,             // A entidade Client
      issueDate,          // Agora passando como objeto Date
    });
    
    return await this.dealRepository.save(deal);  // Usa 'await' para resolver a Promise
  }
  

  public async getAllDeals(): Promise<Deal[]> {
    try {
      return await this.dealRepository.findAll();
    } catch (error) {
      console.error('Erro ao buscar financiamentos:', error);
      throw new Error('Erro ao buscar financiamentos.');
    }
  }

  public async getDealById(id: string): Promise<Deal | null> {
    try {
      return await this.dealRepository.findById(id);
    } catch (error) {
      console.error('Erro ao buscar financiamento:', error);
      throw new Error('Erro ao buscar financiamento.');
    }
  }

  public async updateDeal(id: string, data: Partial<ICreateDeal>): Promise<Deal | null> {
    try {
      // Converte as datas se forem passadas e garante a atualização do updatedAt
      const updateData: Partial<Deal> = {
        ...data,
        issueDate: data.issueDate ? new Date(data.issueDate) : undefined, // Converte a string issueDate para Date
        updatedAt: new Date(), // Atualiza o campo de data de atualização com a data atual
      };

      // Realiza a atualização do registro no repositório
      return await this.dealRepository.update(id, updateData);
    } catch (error) {
      console.error('Erro ao atualizar financiamento:', error);
      throw new Error('Erro ao atualizar financiamento.');
    }
  }




  public async deleteDeal(id: string): Promise<boolean> {
    try {
      return await this.dealRepository.delete(id);
    } catch (error) {
      console.error('Erro ao deletar financiamento:', error);
      throw new Error('Erro ao deletar financiamento.');
    }
  }
}
