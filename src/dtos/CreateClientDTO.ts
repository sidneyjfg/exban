// DTO para criação de cliente
export interface CreateClientDTO {
  name: string;
  fiscalIdentifier: string; // CPF ou CNPJ
  email: string;
}

// DTO para atualização de cliente
export interface UpdateClientDTO {
  name?: string;
  fiscalIdentifier?: string;
  email?: string;
}
