import axios from 'axios';

export interface OverviewInfo {
    height?: number; //高度
    latestBlock?: string; //最新区块
    totalPower?: number, //全网算力
    activeMiner?: number, //活跃矿工
    blockReward?: number, //区块奖励
    dayAveReward?: number, //24h算力平均收益
    dayProduction?: number, //24h产出量
    dayMessage?: number, //24h消息数
    totalAccount?: number, //总账户数
    aveBlockInterval?: number, //平均区块间隔
}

export function getOverviewInfo() {
    return axios.post<OverviewInfo>('/api/overview/info');
}