// src/interfaces/ICreateDeal.ts

export interface ICreateDeal {
  value: number;        // O valor do financiamento
  interestRate: number; // A taxa de juros aplicada ao financiamento
  issueDate: string;    // A data de emissão do financiamento
  clientId: string;     // O ID do cliente
  propertyId: string;   // O ID do imóvel
}
