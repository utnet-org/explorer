// router/index.js

import { createRouter, createWebHistory } from "vue-router";
import Home from "../page/home/index.vue"; // 你的视图组件路径

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // 其他路由配置
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
