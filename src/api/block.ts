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

export function getBlockInfo() {
  return axios.post<BlockInfo[]>('/api/block/info');
}

export function getLastBlock() {
  return axios.post<LastBlock[]>('/api/block/last');
}
