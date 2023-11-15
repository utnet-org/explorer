<script setup lang="ts">
import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
//表格相关数据及变脸
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
const dropdownText = ref('in8')
const changeDropdownText = (command: string) => {
    if (command === 'in8') {
        dropdownText.value = 'in8'
    }
    if (command === 'fp16') {
        dropdownText.value = 'fp16'
    }
    if (command === 'tf32') {
        dropdownText.value = 'tf32'
    }
}
</script>
<template>
    <div class="computing_power_service_content">
        <div class="computing_power_service_header">
            <div class="computing_power_service_title">算力服务排行榜</div>
        </div>
        <div class="computing_power_service_tabs">
            <div class="computing_power_service_tabs_title">有效算力</div>
            <div class="computing_power_service_tabs_dropdown">
                <div class="computing_power_service_tabs_dropdown_title">算力类型</div>
                <el-dropdown @command="changeDropdownText">
                    <div class="dropdown_text">{{ dropdownText }}</div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="in8">in8</el-dropdown-item>
                            <el-dropdown-item command="fp16">fp16</el-dropdown-item>
                            <el-dropdown-item command="tf32">tf32</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="ecology_table">
            <el-table :data="tableData" table-layout="fixed"
                :header-cell-style="{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: '300', borderBottom: 'none', backgroundColor: '#F9F9F8' }"
                :cell-style="{ color: '#000', height: '36px', fontSize: '14px', fontWeight: '500', textAlign: 'center', borderBottom: '0.5px solid rgba(140, 233, 220,0.5)', backgroundColor: '#F9F9F8' }">
                <el-table-column type="index" label="排名" width="48px" />
                <el-table-column prop="name" label="算力提供者" />
                <el-table-column label="标签">
                    <template #default="">
                        <div>---</div>
                    </template>
                </el-table-column>
                <el-table-column label="有效算力 / 占比" width="250px">
                    <template #default="">
                        <div style="display: flex;align-items: center;justify-content: center;">
                            <div>92.12 TFLOPS</div>
                            <div style="margin-left: 10px;">
                                <el-progress :stroke-width="15" :text-inside="true" percentage="37"
                                    color="rgba(62, 223, 207, 1)" style="width: 119px;" />
                            </div>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column label="24小时出块奖励">
                    <template #default="">
                        <div>452.11 UNC</div>
                    </template>
                </el-table-column>
                <el-table-column label="24小时算力效率">
                    <template #default="">
                        <div>0.01 UNC/TFLOPS</div>
                    </template>
                </el-table-column>
                <el-table-column label="24小时算力增量">
                    <template #default="">
                        <div>0.0012 TFLOPS</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="open_more">查看更多</div>
    </div>
</template>
<style scoped lang="scss">
.computing_power_service_content {
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

    .computing_power_service_tabs {
        margin: 12px 22px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .computing_power_service_tabs_title {
            color: #000;
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 600;
            padding: 2px 24px;
            border-radius: 38px;
            border: 0.5px solid #3EDFCF;
        }

        .computing_power_service_tabs_dropdown {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .computing_power_service_tabs_dropdown_title {
                color: #000;
                opacity: 0.5;
                font-family: PingFang SC;
                font-size: 12px;
                font-weight: 400;
                padding: 2px 16px;
                margin-right: 6px;
                border-radius: 38px;
                border: 0.5px solid #3EDFCF;
            }

            .dropdown_text {
                width: 65px;
                height: 21px;
                line-height: 21px;
                text-align: center;
                color: #191919;
                font-family: PingFang SC;
                font-size: 12px;
                font-weight: 600;
                border-radius: 38px;
                background: #3EDFCF;
            }
        }


    }

    .ecology_table {
        width: 100%;
        padding: 0 22px;
        box-sizing: border-box;
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