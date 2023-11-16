<script setup lang="ts">
// import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
//表格相关数据及变脸
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
    <div class="new_block_content">
        <div class="new_block_content_header">
            <div class="new_block_content_header_title">最新区块</div>
            <div class="new_block_content_header_button">查看更多</div>
        </div>
        <div class="ecology_table">
            <el-table :data="tableData" table-layout="fixed" height="404px"
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
.new_block_content {
    // height: 393px;
    border-radius: 8px;
    background: #F9F9F8;
    box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    margin: 0 32px 16px;

    .computing_power_service_header {
        margin: 0 22px;
        padding: 19px 0 12px;
        border-bottom: 0.5px solid rgba(140, 233, 220, 0.5);

        .computing_power_service_title {
            color: #000;
            font-family: PingFang SC;
            font-size: 16px;
            font-weight: 500;
        }
    }

    .new_block_content_header {
        padding: 19px 22px 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .new_block_content_header_title {
            color: #000;
            font-family: PingFang SC;
            font-size: 16px;
            font-weight: 500;

        }

        .new_block_content_header_button {
            color: #191919;
            font-family: PingFang SC;
            font-size: 14px;
            font-weight: 400;
            padding: 4px 23px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.80);
            box-shadow: 2px 2px 2px 0px rgba(0, 209, 255, 0.02) inset, -2px -2px 2px 0px rgba(0, 209, 255, 0.02) inset;
            cursor: pointer;
        }
    }

    .ecology_table {
        width: 100%;
        padding: 0 22px;
        box-sizing: border-box;
    }
}
</style>