// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/home/index.vue'; // 你的视图组件路径
import DefaultHome from '../page/index.vue'; // 你的视图组件路径
import Test from '../page/home/test.vue'; // 你的视图组件路径
import BlockChain from '../page/blockchain/index.vue'; // 你的视图组件路径
import Message from '../page/blockchain/message.vue'; // 你的视图组件路径
import RichList from '../page/blockchain/richList.vue'; // 你的视图组件路径
import OrderList from '../page/blockchain/order.vue'; // 你的视图组件路径
import MemoryPool from '../page/blockchain/memoryPool.vue'; // 你的视图组件路径
import ContractVerification from '../page/blockchain/contractVerification.vue'; // 你的视图组件路径
import Contract from '../page/home/contract.vue'; // 你的视图组件路径
import Statistics from '../page/home/statistics.vue'; // 你的视图组件路径
import Resource from '../page/resource/index.vue'; // 你的视图组件路径
import KnowledgeBase from '../page/resource/knowledgeBase.vue'; // 你的视图组件路径
import Uvm from '../page/home/uvmStatistics.vue'; // 你的视图组件路径
import Ranking from '../page/home/ranking.vue'; // 你的视图组件路径

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
        path: '/contract',
        component: Contract,
      },
      {
        path: '/statistics',
        component: Statistics,
      },
      {
        path: '/resource',
        component: Resource,
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
