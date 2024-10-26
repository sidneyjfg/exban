// src/dtos/CreatePropertyDTO.ts
export interface CreatePropertyDTO {
  address: string;
  value: number;
  clientId?: string;  // Agora é opcional
}
