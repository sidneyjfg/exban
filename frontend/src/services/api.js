// src/services/api.js

const API_BASE_URL = 'http://localhost:9000'; // URL base do seu backend
// Função para obter todos os clientes
export const fetchClients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error; // Propaga o erro para que possa ser tratado no componente
  }
};

// Função para adicionar um novo cliente
export const addClient = async (clientData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    });

    if (!response.ok) {
      throw new Error('Failed to add client');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding client:', error);
    throw error; // Propaga o erro para que possa ser tratado no componente
  }
};

// Adicione outras funções para operações CRUD conforme necessário
