export const isValidCPF = (cpf: string): boolean => {
  // Exemplo simples para demonstrar validação de CPF
  if (!cpf || cpf.length !== 11 || !/^\d+$/.test(cpf)) {
    return false;
  }
  // Simula um CPF válido apenas para fins de teste
  return cpf === '12345678901';  // Exemplo de CPF válido para teste
};
