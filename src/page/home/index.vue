<script setup lang="ts">
  import { ref } from 'vue';
  // defineProps<{ msg: string }>()
  // const count = ref(0)
  // import NavPage from '../../components/navContent.vue';
  import HeaderPage from '../../components/headerContent.vue';
  import EChartPage from '../../components/eChartContent.vue';
  import EcologyPage from '../../components/ecologyContent.vue';
  import PowerPage from '../../components/powerContent.vue';
  import BlockPage from '../../components/blockContent.vue';
  // import FooterPage from '../../components/footerContent.vue';
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
    <!-- 头部 -->
    <HeaderPage fromPage="home" />
    <!-- 可视化视图 -->
    <EChartPage :viewportWidth="windowWidth" />
    <!-- 生态导览 -->
    <!--    <EcologyPage :viewportWidth="windowWidth" />-->
    <!-- 算力服务排行榜 -->
    <!--    <PowerPage />-->
    <!-- 最新区块 -->
    <BlockPage fromPage="home" />
  </div>
</template>
<style scoped lang="scss">
  .content {
    width: 100%;
    min-height: 100vh;
    background: #f2f0ea;
  }
</style>
