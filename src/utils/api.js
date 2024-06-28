import axios from 'axios';

const api = axios.create({
  baseURL: `http://34.204.232.95:5000/api/`,
});

export default api;