import axios from 'axios';

export interface OverviewInfo {
  height?: number; //高度
  latest_block?: number; //最新区块时间
  total_power?: number; //全网算力
  active_miner?: number; //活跃矿工
  block_reward?: number; //区块奖励
  day_ave_reward?: number; //24h算力平均收益
  dayProduction?: number; //24h产出量
  dayMessage?: number; //24h消息数
  total_account?: number; //总账户数
  aveBlockInterval?: number; //平均区块间隔
}

export function getOverviewInfo() {
  // return axios.post<OverviewInfo>('/api/mock/overview/info');
  return axios.post<OverviewInfo>('/api/overview/info');
}

export function getSearchFilter() {
  return axios.post('/api/search/filter');
}
