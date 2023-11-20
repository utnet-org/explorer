import axios from 'axios';

export interface EcoInfo {
    rank?: string; //排名
    name?: string; //名称
    trans?: number; //交易次数
    transPer?: number, //交易次数涨跌幅
    uniAddr?: number, //独立地址数
    uniAddrPer?: number, //独立地址数涨跌幅
    locked?: number, //锁定UNC
    lockedPer?: number, //锁定UNC涨跌幅
    tvl?: number, //参与资产总价值TVL
    tvlPer?: number, //参与资产总价值TVL涨跌幅
    tvlRatio?: number, //参与资产总价值TVL占比
}

export function getEcoInfo() {
    return axios.post<EcoInfo[]>('/api/eco/info');
}