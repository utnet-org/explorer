import request from '@/utils/request.ts';

export interface AccountDetail {
  amount: string; //余额
  block_hash: string; //区块哈希
  block_height: number; //区块高度
  code_hash: string; //代码哈希
  pledging: string; //质押
  power: string; //算力
  storage_paid_at: number; //支付时间
  storage_usage: number; // 存储使用量
}

export async function ApiAccountDetail(accountId: string) {
  return await request({
    url: '/api/account/detail',
    method: 'post',
    data: {
      account_id: accountId,
    },
  });
}
