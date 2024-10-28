import React, { useState, useEffect } from 'react';
import DealForm from '../component/DealForm';
import DealList from '../component/DealList';
import dealService from '../services/dealsService';
import clientService from '../services/clientService';
import propertyService from '../services/propertyService';
import { toast } from 'react-toastify';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [clients, setClients] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false); // Não vamos usar o "currentDeal" mais

  useEffect(() => {
    fetchDeals();
    fetchClients();
    fetchProperties();
  }, []);

  const fetchDeals = async () => {
    try {
      const data = await dealService.getAllDeals();
      console.log("Data deals: ", data);
  
      if (data.length === 0) {
        // Exibe um aviso em caso de lista vazia
        toast.warn("Nenhum financiamento registrado.");
      } else {
        setDeals(data);
        toast.success("Financiamentos carregados com sucesso!");
      }
  
    } catch (error) {
      // Exibe um erro apenas se houver problema real de conexão com o backend
      toast.error("Erro ao carregar financiamentos: " + (error.response?.data?.message || "Erro desconhecido."));
    }
  };
  
  

  const fetchClients = async () => {
    try {
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (error) {
      toast.error("Erro ao carregar clientes: ", error.response?.data?.message);
    }
  };

  const fetchProperties = async () => {
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (error) {
      toast.error("Erro ao carregar propriedades: ", error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dealService.deleteDeal(id);
      toast.success('Financiamento deletado com sucesso!');
      setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar financiamento: ", error.response?.data?.message);
    }
  };

  const handleFormSubmit = async () => {
    setShowForm(false);
    fetchDeals(); // Atualiza a lista de financiamentos
  };

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Financiamentos</h1>
      <button onClick={() => setShowForm(true)}>Adicionar Financiamento</button>

      {showForm && (
        <DealForm
          onSubmit={handleFormSubmit}
          onClose={handleClose}
          clients={clients}
          properties={properties}
        />
      )}

      <DealList deals={deals} onDelete={handleDelete} /> {/* Removemos a lógica de edição */}
    </div>
  );
};

export default DealsPage;
