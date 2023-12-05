<script setup lang="ts">
  import { ref } from 'vue';
  // defineProps<{ msg: string }>()
  // const count = ref(0)
  import NavPage from '../components/navContent.vue';
  import FooterPage from '../components/footerContent.vue';
  import { onMounted } from 'vue';
  const windowWidth = ref(document.documentElement.clientWidth);
  //监听窗口大小变化
  onMounted(() => {
    window.addEventListener('resize', () => {
      windowWidth.value = document.documentElement.clientWidth;
      console.log(windowWidth.value);
    });
  });
</script>
<template>
  <div class="content">
    <!-- 顶部导航栏 -->
    <NavPage :viewportWidth="windowWidth" />
    <router-view></router-view>
    <!-- 底部 -->
    <FooterPage :viewportWidth="windowWidth" />
  </div>
</template>
<style scoped lang="scss">
  .content {
    width: 100%;
    min-height: 100vh;
    background: rgba(242, 240, 234, 1);
  }
</style>
