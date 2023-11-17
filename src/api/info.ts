import axios from 'axios';
export function getHomeInfo() {
    return axios.post('/api/home/info');
}