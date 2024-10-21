import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/utils';
import axios from 'axios'; // Para a API de CEP
import './style/PropertyForm.css';

const PropertyForm = ({ onSubmit, property, clientId }) => {
  const [address, setAddress] = useState(property?.address || '');
  const [value, setValue] = useState(property?.value || '');
  const [cep, setCep] = useState(property?.cep || ''); // Estado para o CEP
  const isEditMode = Boolean(property); // Verifica se está no modo de edição

  useEffect(() => {
    if (property) {
      setAddress(property.address);
      setValue(property.value);
      setCep(property.cep);
    }
  }, [property]);

  // Manipulador de mudança de valor
  const handleValueChange = (e) => {
    let inputValue = e.target.value;
    // Remove qualquer coisa que não seja número, ponto ou vírgula
    inputValue = inputValue.replace(/\D/g, '');
    // Formata como moeda BRL
    const formattedValue = formatCurrency(Number(inputValue) / 100);
    setValue(formattedValue);
  };

  // Função para buscar o endereço pela API de CEP (apenas para novo imóvel)
  const fetchAddressByCep = async (cepValue) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      setAddress(`${logradouro}, ${bairro}, ${localidade} - ${uf}`);
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error);
    }
  };

  // Manipulador de mudança de CEP (apenas habilitado se não for edição)
  const handleCepChange = (e) => {
    const newCep = e.target.value;
    setCep(newCep);
    if (newCep.length === 8) {
      fetchAddressByCep(newCep);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Remover 'R$' e converter de volta para número
    const numericValue = Number(value.replace(/\D/g, '')) / 100;

    const propertyData = { 
      address, 
      value: numericValue, 
      clientId, 
      cep
    };

    onSubmit(propertyData); // Envia os dados ao componente pai (PropertiesPage)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={cep}
        onChange={handleCepChange}
        placeholder="CEP"
        disabled={isEditMode} // Desativa o campo CEP se estiver no modo de edição
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Endereço"
        required
      />
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        placeholder="Valor"
        required
      />
      <button type="submit">{property ? 'Atualizar' : 'Criar'} Imóvel</button>
    </form>
  );
};

export default PropertyForm;
