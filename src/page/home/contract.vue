<script setup lang="ts">
import { ref } from 'vue';
// defineProps<{ msg: string }>()
// const count = ref(0)
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
    </div>
</template>
<style scoped lang="scss">
.content {
    width: 100%;
    min-height: 100vh;
    background: #F2F0EA;
}
</style>