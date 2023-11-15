// router/index.js

import { createRouter, createWebHistory } from "vue-router";
import Home from "../page/home/index.vue"; // 你的视图组件路径
import DefaultHome from "../page/index.vue"; // 你的视图组件路径
import Test from "../page/home/test.vue"; // 你的视图组件路径

const routes = [
  {
    path: "/",
    component: DefaultHome,
    children: [
      {
        path: "",
        component: Home,
      },

      {
        path: "/test",
        component: Test,
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
