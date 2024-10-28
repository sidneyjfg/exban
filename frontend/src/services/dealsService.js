import axios from 'axios';

const API_URL = 'http://localhost:9000/deals'; // Substitua pela URL correta da sua API

const dealService = {
  async createDeal(dealData) {
    try {
      const response = await axios.post(API_URL, dealData);
      console.log("dealData recebido no dealsService: ",dealData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar financiamento:', error);
      throw error;
    }
  },

  async getAllDeals() {
    try {
      const response = await axios.get(API_URL);
      
      if (!response.data || response.data.length === 0) {
        // Lança um aviso específico para resposta vazia
        throw { isEmpty: true, message: "Nenhum financiamento registrado." };
      }
  
      return response.data;
    } catch (error) {
      if (error.isEmpty) {
        // Aviso personalizado para lista vazia
        return [];
      }
      console.error('Erro ao buscar financiamentos:', error);
      throw error;
    }
  },
  

  async deleteDeal(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao deletar financiamento:', error);
      throw error;
    }
  }
};

export default dealService;
