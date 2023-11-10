<script setup lang="ts">
// import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
// const count = ref(0)
</script>
<template>
    <div class="footer_content">
        <div>{{ viewportWidth }}</div>
    </div>
</template>
<style scoped lang="scss">
.footer_content {
    width: 100%;
    height: 238px;
    background-color: rgba(15, 172, 182, 1);

    // div {
    //     width: 100px;
    //     height: 100px;
    //     background-color: blue;
    // }
}
</style>