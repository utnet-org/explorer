import axios from 'axios';

export interface TxnInfo {
  height?: number;
  timestamp?: number;
  hash?: string;
  txn_type?: string;
  receiver_id?: string;
  signer_id?: string;
  deposit?: string;
  txn_fee: number;
}

export async function getTxnList(num: number, size: number) {
  return axios.get<TxnInfo[]>('/api/txn/list', {
    params: {
      page_num: num,
      page_size: size,
    },
  });
}

export async function getTxnDetail(hash: string) {
  return axios.post<TxnInfo>('/api/txn/detail', {
    txn_hash: hash,
  });
}

export async function getTxnsAccount(num: number, size: number, accId: string) {
  return axios.get<TxnInfo[]>('/api/txn/account', {
    params: {
      account_id: accId,
      page_num: num,
      page_size: size,
    },
  });
}
