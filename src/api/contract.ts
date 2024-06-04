import axios from 'axios';

export interface ContractDetail {
  // block_hash: string;
  // block_height: number;
  code_base64: string;
  // hash: string;
}

export interface ContractInfo {
  txn_hash: string;
  timestamp: number;
  time_utc: string;
  code_bash: string;
  height: number;
}

export function getContract(accId: string) {
  // return axios.post<ContractDetail>('/api/contract/detail');
  return axios.post('/api/contract/detail', { account_id: accId });
}

export function getContractInfo(accId: string) {
  // return axios.post<ContractDetail>('/api/contract/detail');
  return axios.post('/api/contract/info', { account_id: accId });
}
