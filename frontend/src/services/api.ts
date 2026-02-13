import axios from 'axios';

// Exportando a URL para os arquivos que pedem 'API_URL'
export const API_URL = import.meta.env.VITE_API_URL;

// Criando e exportando a instância 'api'
export const api = axios.create({
  baseURL: API_URL,
});