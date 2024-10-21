import axios from 'axios';

const API_URL = 'http://localhost:9000';

const clientService = {
  
  async getAllClients() {
    try {
      const response = await axios.get(`${API_URL}/clients`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error; // Propaga o erro para ser capturado no componente
    }
  }
  ,

  async addClient(clientData) {
    try {
      console.log('Dados enviados para criar cliente:', clientData);
      const response = await axios.post(`${API_URL}/clients`, clientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      throw error; // Lança o erro para ser tratado pelo componente
    }
  },

  async updateClient(id, clientData) {
    try {
      console.log('Dados enviados para atualizar cliente:', clientData);
      const response = await axios.put(`${API_URL}/clients/${id}`, clientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  async deleteClient(id) {
    try {
      const response = await axios.delete(`${API_URL}/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw error;
    }
  },
};

export default clientService;
