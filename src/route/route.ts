// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/home/index.vue'; // 你的视图组件路径
import DefaultHome from '../page/index.vue'; // 你的视图组件路径
import Test from '../page/home/test.vue'; // 你的视图组件路径
import BlockChain from '../page/blockchain/index.vue'; // 你的视图组件路径
import Message from '../page/blockchain/message.vue'; // 你的视图组件路径
import RichList from '../page/blockchain/richList.vue'; // 你的视图组件路径
import OrderList from '../page/blockchain/order.vue'; // 你的视图组件路径
import Contract from '../page/home/contract.vue'; // 你的视图组件路径
import Statistics from '../page/home/statistics.vue'; // 你的视图组件路径
import Resource from '../page/home/resource.vue'; // 你的视图组件路径

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
    ],
  },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
