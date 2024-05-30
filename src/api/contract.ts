import axios from 'axios';

export interface ContractDetail {
  // block_hash: string;
  // block_height: number;
  code_base64: string;
  // hash: string;
}

export function getContract(accId: string) {
  // return axios.post<ContractDetail>('/api/contract/detail');
  return axios.post('/api/contract/detail', { account_id: accId });
}
