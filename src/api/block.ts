import axios from 'axios';

export interface BlockInfo {
  height?: number; // 高度
  latest?: string; // 最新区块时间
  ids?: string[]; // 区块ID数组
  miners?: string[]; // Miner
  tags?: string[]; // 标签
  msgs?: number[]; // 消息数
  rewards?: number[]; // 奖励
}

export interface LastBlock {
  height?: number; // 高度
  hash?: string; // 交易Hash
  chunkHash?: string; // chunkHash
  timestamp?: number; // 时间
  author?: string; // 矿工
  gasPrice?: number; // Gas价格
  gasLimit?: number; // Gas限制
}

export interface BlockDetails {
  data(
    blockDetails: {
      height?: number | undefined;
      hash?: string | undefined;
      chunk_hash?: string | undefined;
      timestamp?: number | undefined;
      timestamp_nanosec?: string | undefined;
      author?: string | undefined;
      gas_used?: number | undefined;
      gas_price?: number | undefined;
      gas_limit?: number | undefined;
      gas_fee?: number | undefined;
      prev_hash?: number | undefined;
    },
    data: any,
  ): unknown;
  height?: number; // 高度
  hash?: string; // 交易Hash
  chunk_hash?: string; // chunkHash
  timestamp?: number; // 时间
  timestamp_nanosec?: string; // 时间
  transactions?: number; // 交易
  receipts?: number; // 回执
  author?: string; // 矿工
  gas_used?: number; // Gas价格
  gas_price?: number; // Gas价格
  gas_limit?: number; // Gas限制
  gas_fee?: number; // Gas限制
  prev_hash?: string; // 父Hash
}
export interface BlockDetailsId {
  account_id?: string; // 账户iD
  is_slashed?: boolean; // 是否惩罚
  num_expected_blocks?: number; // 预计Block
  num_expected_Chunks?: number; // 预计Chunk
  num_produced_blocks?: number; // 产出Block
  num_produced_chunks?: number; // 产出Chunk
  pledge?: string; // 质押量
  power?: string; // 算力
  public_key?: string; // 公钥
}
export interface BlockDetailsReq {
  query_type?: number; // 1 block height 2 block hash
  query_word?: string;
}

export function getBlockInfo() {
  return axios.post<BlockInfo[]>('/api/block/info');
}

export function getLastBlock() {
  return axios.post<LastBlock[]>('/api/block/last');
}

export function getBlockDetails(data: BlockDetailsReq) {
  return axios.post<BlockDetails>('/api/block/details', data);
}

export async function apiBlockList(num: number, size: number) {
  return axios.get('/api/block/list', {
    params: {
      page_num: num,
      page_size: size,
    },
  });
}
