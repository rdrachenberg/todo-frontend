import axios from 'axios';

const url = process.env.NODE_ENV == 'production' ? '/tasks' : 'http://localhost:8080/tasks'

const api = axios.create({
  baseURL: `${url}`,
});

export default api;
