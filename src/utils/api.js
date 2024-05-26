import axios from 'axios';

const api = axios.create({
  baseURL: `https://4a29-45-8-22-59.ngrok-free.app/api/`,
});

export default api;