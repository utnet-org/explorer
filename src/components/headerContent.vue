<script setup lang="ts">
// import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
// const count = ref(0)
</script>
<template>
    <div class="header_content">
        <div>{{ viewportWidth }}</div>
    </div>
</template>
<style scoped lang="scss">
.header_content {
    width: 100%;
    height: 449px;
    background-color: orange;

    // div {
    //     width: 100px;
    //     height: 100px;
    //     background-color: blue;
    // }
}
</style>