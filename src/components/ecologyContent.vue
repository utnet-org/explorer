<script setup lang="ts">
// import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
// const count = ref(0)
</script>
<template>
    <div class="ecology_content">
        <div>{{ viewportWidth }}</div>
    </div>
</template>
<style scoped lang="scss">
.ecology_content {
    width: 100%;
    height: 380px;
    background-color: green;

    // div {
    //     width: 100px;
    //     height: 100px;
    //     background-color: blue;
    // }
}
</style>