<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

// 定义 Ethereum 类型
declare global {
  interface Window {
    ethereum?: any;
  }
}

// 等待页面加载完成后执行
window.onload = () => {
  // 获取按钮元素
  const connectButton = document.getElementById('connectButton');
  
  // 检查按钮元素是否存在
  if (connectButton) {
    // 添加点击事件监听器
    connectButton.onclick = async () => {
      // 检查是否存在 MetaMask
      if (window.ethereum) {
        try {
          // 请求用户授权连接到 MetaMask
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('已连接到 MetaMask');
          // 获取连接的钱包地址
          const connectedAddress = accounts[0];
          // 更新按钮文字为钱包地址
          connectButton.textContent = `${connectedAddress}`;
        } catch (error) {
          console.error('连接 MetaMask 时发生错误', error);
        }
      } else {
        console.error('MetaMask 未安装');
      }
    };
  }
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button id="connectButton">连接到 MetaMask</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<!-- 在 HTML 中引入 MetaMask 和 TypeScript 定义 -->
<!--<script src="https://cdn.jsdelivr.net/npm/web3@1.3.6/dist/web3.min.js"></script>-->
<!--<script src="https://cdn.jsdelivr.net/npm/@types/web3@1.0.29/index.d.ts"></script>-->


