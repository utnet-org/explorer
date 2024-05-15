import axios from 'axios';

export interface ChipInfo {
  chip_type?: string;
  power?: number;
  serial_number?: string;
  bus_id?: string;
  p2key?: string;
  public_key?: string;
}
export interface BlockDetailsReq {
  query_type?: number; // 1 block height 2 block hash
  query_word?: string;
}

export function getChipInfo(key: string) {
  return axios.post<ChipInfo[]>('/api/query/chipinfo', { search_key: key });
}
