import React, { useState, useEffect } from 'react';
import clientService from '../services/clientService'; // Importando o service
import ClientForm from '../component/ClientForm';
import ClientList from '../component/ClientList';
import '../component/style/Clients.css';
import { toast } from 'react-toastify';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [filteredClients, setFilteredClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);

  const fetchClients = async () => {
    try {
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao carregar clientes';
      toast.error(`Erro: ${errorMessage}`);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    setFilteredClients(clients.filter(client =>
      client[filterType].toString().toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, filterType, clients]);

  const handleEdit = (client) => {
    setCurrentClient(client);
    setIsModalOpen(true); // Abre a modal para editar o cliente
  };
  const handleDelete = async (id) => {
    try {
      await clientService.deleteClient(id); // Deleta o cliente
      toast.success('Cliente removido com sucesso!'); // Exibe a notificação
      fetchClients(); // Atualiza a lista de clientes
    } catch (error) {
      toast.error('Erro ao remover cliente.');
    }
  };
  const handleAddClient = () => {
    setCurrentClient(null); // Reseta o cliente atual para um novo cadastro
    setIsModalOpen(true); // Abre a modal para adicionar um novo cliente
  };

  return (
    <div className="clients-page">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder={`Pesquisar por ${filterType}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="name">Nome</option>
          <option value="fiscalIdentifier">CPF</option>
          <option value="email">Email</option>
        </select>
        <button className="add-client-btn" onClick={handleAddClient}>
          Adicionar Cliente
        </button>
      </div>

      {/* Abre o formulário de cliente */}
      {isModalOpen && (
        <ClientForm
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          fetchClients={fetchClients}
          client={currentClient} // Passa o cliente atual para edição ou null para cadastro
        />
      )}

      {/* Renderiza a lista de clientes */}
      <ClientList
        clients={filteredClients}
        onEdit={handleEdit}
        fetchClients={fetchClients}
        onDelete={handleDelete} // Passa a função de deletar para o ClientList
      />
    </div>
  );
}

export default ClientsPage;
