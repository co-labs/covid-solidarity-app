import axios from 'axios';
import cookie from 'js-cookie';

/**
 * Return an instanciated Axios with baseUrl and api authorization (if it exists)
 * @type {AxiosInstance}
 */
const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
  headers: {'Authorization': 'Bearer ' + cookie.get('token')}
});

export default api;
