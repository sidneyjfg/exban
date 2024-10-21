import axios from 'axios';

const API_URL = 'http://localhost:9000';

const propertyService = {
  async createProperty(data) {
    console.log('Dados enviados para criar imóvel:', data);  // Verifica os dados enviados, incluindo a imagem
    const response = await axios.post(`${API_URL}/properties`, data);
    return response.data;
  },
  
  async updateProperty(id, data) {
    console.log('Dados enviados para atualizar imóvel:', data);  // Verifica os dados enviados, incluindo a imagem
    const response = await axios.put(`${API_URL}/properties/${id}`, data);
    return response.data;
  },

  async getAllProperties() {
    const response = await axios.get(`${API_URL}/properties`);
    console.log("Retorno da API (getAllProperties): ", response.data);
    return response.data;
  },
  
  async deleteProperty(id) {
    const response = await axios.delete(`${API_URL}/properties/${id}`);
    return response.data;
  }
};


export default propertyService;
