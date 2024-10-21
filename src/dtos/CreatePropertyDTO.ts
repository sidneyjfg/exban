// src/dtos/CreatePropertyDTO.ts
export interface CreatePropertyDTO {
    address: string;
    value: number;
    clientId: string; // Referência ao ID do cliente que está criando o imóvel
  }
  