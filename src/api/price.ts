import axios from 'axios';
export function getPrice() {
  return axios.get('/api/price');
}

export function getCoinPrice() {
  return axios.get('/api/coin/price');
}
