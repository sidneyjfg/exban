// Função para formatar o valor em BRL
export function formatCurrency(value) {
  if (value == null || isNaN(value)) {
    return 'R$ 0,00'; // Retorna um valor padrão ou vazio se o valor não for numérico
  }
  
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}


export const formatCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
  if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};