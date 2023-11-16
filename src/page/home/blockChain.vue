<script setup lang="ts">
import { ref } from 'vue';
import HeaderPage from '../../components/otherHeaderContent.vue';
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
const tableData = [
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
            'baf...azy',
            'baf...azy'
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]

    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy',
        ]
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
        newBlockList: [
            'baf...azy',
            'baf...azy',
            'baf...azy'
        ]
    },
]
</script>
<template>
    <div class="content">
        <!-- 头部 -->
        <HeaderPage :viewportWidth=windowWidth />
        <div style="height: 212px;"></div>
        <div class="block_list">
            <div class="block_list_header">区块列表</div>
            <el-table :data="tableData" table-layout="fixed"
                :header-cell-style="{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: '300', borderBottom: 'none', backgroundColor: '#F9F9F8' }"
                :cell-style="{ color: '#000', height: '36px', fontSize: '14px', fontWeight: '500', textAlign: 'center', borderBottom: '0.5px solid rgba(140, 233, 220,0.5)', backgroundColor: '#F9F9F8' }">
                <el-table-column prop="name" label="高度">
                    <template #default="">
                        <div style="color: #0FACB6;margin-bottom: 8px;font-size: 14px;">3292964</div>
                        <div style="color: #6a6a69;font-size: 12px;">1分13秒前</div>
                    </template>
                </el-table-column>
                <el-table-column label="区块ID">
                    <template #default="scope">
                        <div v-for="(item, index) in scope.row.newBlockList" :key="index">{{ item }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="算力提供者">
                    <template #default="scope">
                        <div v-for="( index) in scope.row.newBlockList" :key="index">f01234921</div>
                    </template>
                </el-table-column>
                <el-table-column label="标签">
                    <template #default="scope">
                        <div v-for="( index) in scope.row.newBlockList" :key="index">---</div>
                    </template>
                </el-table-column>
                <el-table-column label="消息">
                    <template #default="scope">
                        <div v-for="( index) in scope.row.newBlockList" :key="index">66</div>
                    </template>
                </el-table-column>
                <el-table-column label="奖励">
                    <template #default="scope">
                        <div v-for="( index) in scope.row.newBlockList" :key="index">11.23 UNC</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>
<style scoped lang="scss">
.content {
    width: 100%;
    min-height: 100vh;
    background: #F2F0EA;
    position: relative;

    .block_list {
        width: calc(100% - 124px);
        // height: 500px;
        border-radius: 8px;
        background: #F9F9F8;
        box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        position: relative;
        z-index: 10;
        margin-left: 62px;

        .block_list_header {
            height: 40px;
            line-height: 40px;
            border-radius: 8px;
            background: #FFF;
            padding-left: 26px;
            box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
            color: #000;
            font-family: PingFang SC;
            font-size: 16px;
            font-weight: 500;
        }
    }
}
</style>