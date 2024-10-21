import React from 'react';
import './style/ClientList.css';

const ClientList = ({ clients, onEdit, onDelete, fetchClients, onError }) => {  
 
  return (
    <div className="client-list">
      {clients.length > 0 ? (
        clients.map(client => (
          <div key={client.id} className="client-card">
            <h3>{client.name}</h3>
            <p>CPF: {client.fiscalIdentifier}</p>
            <p>Email: {client.email}</p>
            <button onClick={() => onEdit(client)}>Editar</button>
            <button onClick={() => onDelete(client.id)}>Deletar</button> {/* Usa handleDelete */}
          </div>
        ))
      ) : (
        <p>Nenhum cliente encontrado.</p>
      )}
    </div>
  );
};

export default ClientList;
