<script setup lang="ts">
import { ref } from 'vue';
// defineProps<{ msg: string }>()
// const count = ref(0)
import NavPage from '../../components/navContent.vue';
import HeaderPage from '../../components/headerContent.vue';
import EchartPage from '../../components/eChartContent.vue';
import EcologyPage from '../../components/ecologyContent.vue';
import ComputingPowerServicePage from '../../components/computingPowerServiceContent.vue';
import NewBlockPage from '../../components/newBlockContent.vue';
import FooterPage from '../../components/footerContent.vue';
import { onMounted } from 'vue';
const windowWidth = ref(document.documentElement.clientWidth);
//监听窗口大小变化
onMounted(() => {
    window.addEventListener('resize', () => {
        windowWidth.value = document.documentElement.clientWidth
        console.log(windowWidth.value);
    });

});
</script>
<template>
    <div class="content">
        <!-- 顶部导航栏 -->
        <NavPage :viewportWidth=windowWidth />
        <!-- 头部 -->
        <HeaderPage :viewportWidth=windowWidth />
        <!-- 可视化视图 -->
        <EchartPage :viewportWidth=windowWidth />
        <!-- 生态导览 -->
        <EcologyPage :viewportWidth=windowWidth />
        <!-- 算力服务排行榜 -->
        <ComputingPowerServicePage :viewportWidth=windowWidth />
        <!-- 最新区块 -->
        <NewBlockPage :viewportWidth=windowWidth />
        <!-- 底部 -->
        <FooterPage :viewportWidth=windowWidth />
    </div>
</template>
<style scoped lang="scss">
.content {
    width: 100%;
    min-height: 100vh;
    background: #F2F0EA;
}
</style>