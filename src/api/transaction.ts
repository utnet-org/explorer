import axios from 'axios';

export interface TxnInfo {
  height?: number;
  timestamp?: number;
  hash?: string;
  txn_type?: string;
  receiver_id?: string;
  signer_id?: string;
  deposit?: string;
  txn_fee?: string;
}

export async function getTxnList(num: number, size: number) {
  return axios.get<TxnInfo[]>('/api/txn/list', {
    params: {
      page_num: num,
      page_size: size,
    },
  });
}
