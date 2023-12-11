// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/home/index.vue'; //  首页
import DefaultHome from '../page/index.vue'; // 二级路由
import Test from '../page/home/test.vue'; // 你的视图组件路径
import BlockChain from '../page/blockchain/index.vue'; // 最新区块
import Message from '../page/blockchain/message.vue'; // 消息列表
import RichList from '../page/blockchain/richList.vue'; // 富豪榜
import OrderList from '../page/blockchain/order.vue'; // 订单列表
import MemoryPool from '../page/blockchain/memoryPool.vue'; // 内存池消息列表
import ContractVerification from '../page/blockchain/contractVerification.vue'; // 验证并发布合约源代码
import Contract from '../page/resource/contract.vue'; // UVM概览 常用工具
import Statistics from '../page/home/statistics.vue'; // 算力服务图表
import KnowledgeBase from '../page/resource/knowledgeBase.vue'; // 知识库
import Uvm from '../page/pactpage/uvmStatistics.vue'; // uvm 统计
import Ranking from '../page/home/ranking.vue'; // 算力服务排行榜

// assets
const routes = [
  {
    path: '/',
    component: DefaultHome,
    children: [
      {
        path: '',
        component: Home,
      },

      {
        path: '/test',
        component: Test,
      },
      {
        path: '/blockchain',
        component: BlockChain,
      },
      {
        path: '/resource/commontool',
        component: Contract,
      },
      {
        path: '/statistics',
        component: Statistics,
      },
      {
        path: '/blockchain/message',
        component: Message,
      },
      {
        path: '/blockchain/richlist',
        component: RichList,
      },
      {
        path: '/blockchain/order',
        component: OrderList,
      },
      {
        path: '/blockchain/memoryPool',
        component: MemoryPool,
      },
      {
        path: '/blockchain/contractVerification',
        component: ContractVerification,
      },
      {
        path: '/resource/knowledgeBase',
        component: KnowledgeBase,
      },
      {
        path: '/contract/uvm',
        component: Uvm,
      },
      {
        path: '/statistics/ranking',
        component: Ranking,
      },
    ],
  },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
