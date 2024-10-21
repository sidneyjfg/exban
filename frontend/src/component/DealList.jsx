import React from 'react';
import { formatCurrency } from '../utils/utils';
import { toast } from 'react-toastify'; // Importando o toast para exibir a notificação

const DealList = ({ deals, onDelete }) => {
  const handleEditClick = () => {
    toast.warning('Função ainda não implementada!'); // Exibe a notificação
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Valor de Entrada / Total do Imóvel</th>
          <th>Status</th>
          <th>Nome do Cliente</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {deals.map((deal) => (
          <tr key={deal.id}>
            <td>
              {`${formatCurrency(deal.value)} / ${formatCurrency(deal.property?.value || 0)}`}
            </td>
            <td>{deal.status === 'active' ? 'Quitado' : 'Ativo'}</td>
            <td>{deal.client?.name || 'Nome não disponível'}</td>
            <td>
              <button onClick={handleEditClick}>Editar</button> {/* Exibe somente a notificação */}
              <button onClick={() => onDelete(deal.id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DealList;
