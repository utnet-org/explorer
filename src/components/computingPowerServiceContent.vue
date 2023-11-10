<script setup lang="ts">
// import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
// const count = ref(0)
</script>
<template>
    <div class="computing_power_service_content">
        <div>{{ viewportWidth }}</div>
    </div>
</template>
<style scoped lang="scss">
.computing_power_service_content {
    width: 100%;
    height: 393px;
    background-color: blue;

    // div {
    //     width: 100px;
    //     height: 100px;
    //     background-color: blue;
    // }
}
</style>