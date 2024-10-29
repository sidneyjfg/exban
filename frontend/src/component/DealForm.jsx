import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatCurrency, formatCPF } from '../utils/utils';
import './style/DealForm.css';
import dealService from '../services/dealsService';

const DealForm = ({ onSubmit, onClose, deal, clients, properties }) => {
  const [rawAmount, setRawAmount] = useState(deal?.value || '');
  const [interestRate, setInterestRate] = useState(deal?.interestRate || '');
  const [issueDate, setIssueDate] = useState(deal?.issueDate || '');
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const clientOptions = clients.map(client => ({
    label: `${client.name} (${formatCPF(client.fiscalIdentifier)})`,
    value: client.id
  }));

  const propertyOptions = properties.map(property => ({
    label: property.address,
    value: property.id
  }));

  useEffect(() => {
    if (deal) {
      setRawAmount(deal.value || '');
      setInterestRate(deal.interestRate || '');
      setIssueDate(deal.issueDate || '');

      const client = clientOptions.find(option => option.value === deal.clientId);
      const property = propertyOptions.find(option => option.value === deal.propertyId);

      setSelectedClient(client || null);
      setSelectedProperty(property || null);
    }
  }, [deal, clientOptions, propertyOptions]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.,]/g, '');
    setRawAmount(value);
  };

  const handleAmountBlur = () => {
    setRawAmount(formatCurrency(rawAmount));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Converte vírgula para ponto decimal e remove pontos para obter o valor numérico correto
    const numericAmount = parseFloat(rawAmount.replace(/R\$\s?/g, '').replace(/\./g, '').replace(',', '.'));
    const numericInterestRate = parseFloat(interestRate) || 0;

    // Verifica se todos os campos obrigatórios estão preenchidos corretamente
    if (!numericAmount || !numericInterestRate || !issueDate || !selectedClient || !selectedProperty) {
      toast.error('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const dealData = {
      value: numericAmount,
      interestRate: numericInterestRate || 0,
      issueDate,
      clientId: selectedClient?.value,
      propertyId: selectedProperty?.value,
    };
    console.log("DEAL DATA: ",dealData);
    try {
      if (deal?.id) {
        await dealService.updateDeal(deal.id, dealData);
        toast.success('Financiamento atualizado com sucesso!');
      } else {
        await dealService.createDeal(dealData);
        toast.success('Financiamento salvo com sucesso!');
      }

      onSubmit();
    } catch (error) {
      toast.error(`Erro: ${error.response?.data?.message}`);
    }
};


  return (
    <div className="modal-backdrop">
      <form className="modal-content" onSubmit={handleSubmit}>
        <label>Valor de Entrada:</label>
        <input
          type="text"
          value={rawAmount}
          onChange={handleAmountChange}
          onBlur={handleAmountBlur}
          required
        />

        <label>Taxa de Juros (%):</label>
        <input
          type="number"
          value={interestRate}
          onChange={e => setInterestRate(e.target.value)}
          required
        />

        <label>Data de Emissão (Issue Date):</label>
        <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} required />

        <label>Cliente:</label>
        <Select
          options={clientOptions}
          value={selectedClient}
          onChange={setSelectedClient}
          isDisabled={!!deal}
          placeholder="Selecione um cliente..."
        />

        <label>Imóvel:</label>
        <Select
          options={propertyOptions}
          value={selectedProperty}
          onChange={setSelectedProperty}
          isDisabled={!!deal}
          placeholder="Selecione um imóvel..."
        />

        <button type="submit">Salvar Financiamento</button>
        <button type="button" className="button-cancel" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default DealForm;

