import axios from 'axios';

export interface PowerRank {
  rank?: string; //排名
  miner?: string; //算力提供者
  tag?: number; //标签
  effPower?: number; //有效算力
  effPer?: number; //有效算力占比
  dayReward?: number; //24小时出块奖励
  dayEff?: number; //24小时算力效率
  dayGrowth?: number; //24小时算力增量
}

export function getPowerRank() {
  return axios.post<PowerRank[]>('/api/power/rank');
}
