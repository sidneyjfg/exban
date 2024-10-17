// ClientList.jsx
import React from 'react';
import './style/ClientList.css';

function ClientList({ clients }) {
  if (!clients || !clients.length) {
    return <p>Nenhum cliente encontrado.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(client => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            <td>{client.fiscalIdentifier}</td>
            <td>{client.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
  );
}


export default ClientList;
