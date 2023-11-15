<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
const loading = ref(false)
const hoverRowIndex = ref()
const hoveredRowData = ref(null as Record<string, any> | null)
const tableData = [
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '+8.34%',
        name: 'MineFi',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const handleMouseEnter = (row: Record<string, any>, event: MouseEvent) => {
    // hoverRowIndex.value = tableData.indexOf(row)
    // console.log(row, hoverRowIndex.value,event)
    console.log(row, event);
    hoveredRowData.value = row
}
const handleMouseLeave = (row: null, index: any) => {
    hoverRowIndex.value = index
    console.log(row, index)
}
const rowClassName = () => {
    return 'hover-row';
}
</script>
<template>
    <div class="ecology_content">
        <div></div>
        <el-table v-loading="loading" :data="tableData" :highlight-current-row="true"
            style="max-height: 233px;margin:0 22px;" table-layout="fixed"
            :header-cell-style="{ color: '#000', fontSize: '12px', fontWeight: '300', opacity: '0.5' }"
            :cell-style="{ color: '#000', fontSize: '14px', fontWeight: '500', textAlign: 'center', height: '36px', borderBottom: '0.5px solid rgba(140, 233, 220,0.5)' }"
            :row-class-name="rowClassName" @cell-mouse-enter="handleMouseEnter" @cell-mouse-leave="handleMouseLeave">
            <el-table-column type="index" label="排名" width="32" />
            <el-table-column prop="name" label="名称" />
            <el-table-column label="交易次数">
                <template #default="scope">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div>16</div>
                        <div style="color: #0FACB6;margin-left: 7px;">{{ scope.row.date }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="独立地址数">
                <template #default="scope">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div>16</div>
                        <div style="color: #0FACB6;margin-left: 7px;">{{ scope.row.date }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="TVL">
                <template #default="scope">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div>$21.2M USD</div>
                        <div style="color: #0FACB6;margin-left: 7px;">{{ scope.row.date }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="通证">
                <template #default="scope">
                    <div style="display: flex;align-items: center;justify-content: center;">
                        <div>$21.2M USD</div>
                        <div style="color: #0FACB6;margin-left: 7px;">{{ scope.row.date }}</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="open_more">查看更多</div>
    </div>
</template>
<style scoped lang="scss">
.ecology_content {
    height: 393px;
    border-radius: 8px;
    background: F9F9F8;
    box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    margin: 0 32px 16px;

    .hover-row {
        background-color: #e0f7fa !important;
        color: red;
        /* 设置你想要的背景颜色 */
    }

    .open_more {
        margin-top: 12px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #000;
        font-size: 14px;
        cursor: pointer;
        font-weight: 400;
        border-radius: 0px 0px 8px 8px;
        background: rgba(255, 255, 255, 0.80);
    }
}
</style>