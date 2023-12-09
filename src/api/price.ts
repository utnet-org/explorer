import axios from 'axios';
export function getPrice() {
  return axios.get('/api/price');
}
