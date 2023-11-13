import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./route/route.ts";
import axiosInstance from "./servers/request.ts";
const app = createApp(App);
app.use(router).provide("axios", axiosInstance).mount("#app");
