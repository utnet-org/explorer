import axios from 'axios';

export interface BlockInfo {
  height?: number; //高度
  latest?: string; //最新区块时间
  ids?: string[]; //区块ID数组
  miners?: string[]; //Miner
  tags?: string[]; //标签
  msgs?: number[]; //消息数
  rewards?: number[]; //奖励
}

export function getBlockInfo() {
  return axios.post<BlockInfo[]>('/api/block/info');
}
