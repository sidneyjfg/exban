import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientForm from '../component/ClientForm';
import ClientList from '../component/ClientList';
import '../component/style/Clients.css'; // Importe o CSS da página

function ClientsPage() {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('name'); // Default filter type
    const [filteredClients, setFilteredClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      fetchClients();
    }, []);
  
    useEffect(() => {
      // Filtro para clientes conforme a busca
      setFilteredClients(clients.filter(client => {
        return client[filterType].toString().toLowerCase().includes(search.toLowerCase());
      }));
    }, [search, filterType, clients]); // Dependências para reação
  
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:9000/clients');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    return (
        <div className="clients-page">
            <div className="search-bar">
                <input
                    className="search-input"
                    type="text"
                    placeholder={`Pesquisar por ${filterType}...`}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={filterType}
                    onChange={e => setFilterType(e.target.value)}
                >
                    <option value="name">Nome</option>
                    <option value="fiscalIdentifier">CPF</option>
                    <option value="email">Email</option>
                </select>
                <button className="add-client-btn" onClick={() => setIsModalOpen(true)}>Adicionar Cliente</button>
            </div>
            <ClientForm isOpen={isModalOpen} setIsOpen={setIsModalOpen} addClient={fetchClients} />
            <div className="table-container">
                <ClientList clients={filteredClients} />
            </div>
        </div>
    );
}

export default ClientsPage;
