import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropertyList from '../component/PropertyList';
import PropertyForm from '../component/PropertyForm';
import propertyService from '../services/propertyService';
import '../component/style/Properties.css';

const PropertiesPage = () => {
  const [showForm, setShowForm] = useState(false); // Controla o estado do modal
  const [properties, setProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null); // Mantém o imóvel selecionado para edição

  // Função para buscar propriedades
  const fetchProperties = async () => {
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (error) {
      toast.error("Erro ao carregar propriedades.");
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Função para adicionar/atualizar uma propriedade
  const handlePropertySubmit = async (propertyData) => {
    try {
      if (currentProperty) {
        await propertyService.updateProperty(currentProperty.id, propertyData); // Atualiza
        toast.success('Imóvel atualizado com sucesso!');
        // Atualiza diretamente a propriedade no estado
        setProperties((prevProperties) =>
          prevProperties.map((p) => (p.id === currentProperty.id ? propertyData : p))
        );
      } else {
        const newProperty = await propertyService.createProperty(propertyData); // Cria
        toast.success('Imóvel adicionado com sucesso!');
        // Adiciona o novo imóvel à lista de propriedades no estado
        setProperties((prevProperties) => [...prevProperties, newProperty]);
      }
      setShowForm(false); // Fecha o modal após sucesso
    } catch (error) {
      toast.error('Erro ao adicionar/atualizar imóvel.');
      console.error('Erro ao processar o imóvel:', error);
    }
  };

  // Função para deletar uma propriedade
  const handleDelete = async (propertyId) => {
    try {
      await propertyService.deleteProperty(propertyId); // Chama o serviço de exclusão
      toast.success('Imóvel removido com sucesso!');
      // Remove o imóvel deletado do estado local
      setProperties((prevProperties) => 
        prevProperties.filter((property) => property.id !== propertyId)
      );
    } catch (error) {
      toast.error('Erro ao remover imóvel.');
      console.error('Erro capturado ao remover o imóvel:', error);
    }
  };

  // Função para editar uma propriedade
  const handleEdit = (property) => {
    setCurrentProperty(property); // Define o imóvel atual para edição
    setShowForm(true); // Abre o modal para edição
  };

  // Função para abrir o formulário para adicionar um novo imóvel
  const handleAddProperty = () => {
    setCurrentProperty(null); // Limpa o imóvel atual para novo
    setShowForm(true); // Abre o modal para criar novo
  };

  return (
    <div className="properties-page">
      <h1>Lista de Imóveis</h1>
      <button
        className="add-property-button"
        onClick={handleAddProperty} // Função para adicionar novo imóvel
      >
        Adicionar Imóvel
      </button>

      {/* Modal de formulário */}
      {showForm && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <PropertyForm 
              onSubmit={handlePropertySubmit} 
              property={currentProperty} // Passa o imóvel atual (para edição) ou null (para novo imóvel)
              clientId={1} // Pode ajustar o clientId conforme o necessário
            />
            <button 
              className="button-cancel" 
              onClick={() => setShowForm(false)} // Botão para fechar o modal
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <PropertyList 
        properties={properties} 
        onEdit={handleEdit} // Passa a função de editar para o PropertyList
        onDelete={handleDelete} // Passa a função de deletar para o PropertyList
      />
    </div>
  );
};

export default PropertiesPage;
