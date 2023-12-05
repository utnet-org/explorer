// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/home/index.vue'; // 你的视图组件路径
import DefaultHome from '../page/index.vue'; // 你的视图组件路径
import Test from '../page/home/test.vue'; // 你的视图组件路径
import BlockChain from '../page/home/blockChain.vue'; // 你的视图组件路径
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
    ],
  },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
