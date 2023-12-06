<script setup lang="ts">
  import { ref } from 'vue';
  import HeaderPage from '../../components/headerContent.vue';
  import BlockPage from '../../components/blockContent.vue';
  // defineProps<{ msg: string }>()
  // const count = ref(0)
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
    <HeaderPage fromPage="blockChain" />
    <BlockPage fromPage="blockChain" />
  </div>
</template>
<style scoped lang="scss"></style>
