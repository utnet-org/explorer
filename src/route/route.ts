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
import Statistics from '../page/Statistics/statisticsPage.vue'; // 算力服务图表
import KnowledgeBase from '../page/resource/knowledgeBase.vue'; // 知识库
import Gas from '../page/Statistics/gasRanking.vue'; // Gas 排行
import Ranking from '../page/Statistics/rankingPage.vue'; // 算力服务排行榜
import NProgress from 'nprogress'; // progress bar
import BlockDetails from '../page/blockchain/blockDetails.vue'; // 区块详情
import MineDetails from '../page/blockchain/MineDetails.vue'; // 区块详情
import AccountMiner from '../page/blockchain/accountMiner.vue'; // 区块详情
import ChipInfo from '../page/chip/chipInfo.vue';

import TransactionList from '../page/blockchain/transactionList.vue'; // 交易列表
import TransactionDetails from '../page/blockchain/transactionDetail.vue'; // 交易详情
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false });
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
        path: '/blockchain/details',
        component: BlockDetails,
      },
      {
        path: '/blockchain/account',
        component: AccountMiner,
      },
      {
        path: '/blockchain/mine',
        component: MineDetails,
      },
      {
        path: '/blockchain/transaction',
        component: TransactionList,
      },
      {
        path: '/blockchain/transactionDetails',
        component: TransactionDetails,
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
        path: '/statistics/gas',
        component: Gas,
      },
      {
        path: '/statistics/ranking',
        component: Ranking,
      },
      {
        path: '/chip/chipInfo',
        component: ChipInfo,
      },
    ],
  },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 在路由切换前显示进度条
router.beforeEach((to, from, next) => {
  NProgress.start(); //进度条开始
  // 如果跳转到首页,则刷新页面
  if (to.path === '/') {
    // window.location.reload();
  } else {
    window.scrollTo(0, 0);
  }
  next();
});

// 在路由切换后结束进度条
router.afterEach(() => {
  // 跳转后页面滚动到顶部
  NProgress.done(); //进度条结束
});

export default router;
