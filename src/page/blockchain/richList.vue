<script setup lang="ts">
import { onMounted } from 'vue';
import HeaderPage from '../../components/otherHeaderContent.vue';
// import Mock from 'mockjs';
import { getScreenSize, Screen } from '@/utils/screen-size.ts';
// defineProps<{ msg: string }>()
const size = getScreenSize().currentScreenSize;
onMounted(() => {
});
const tableData = [
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
    {
        accountName: 'f3wc2vre...7hjss21iq',
        label: 'Utility',
        balance: '64,999.21',
        balanceRatio: '7.21%',
        type: '普通账户',
        createTime: '2020-10-21 11:13:30',
        latestTransaction: '2023-10-12 16:23:00'
    },
]
</script>
<template>
    <div class="content">
        <HeaderPage />
        <div style="height: 200px;"></div>
        <div class="block_list">
            <div class="block_list_header">
                <div class="block_list_header_title">富豪榜</div>
                <div class="block_list_header_text">共 1141606363 个账户</div>
            </div>
            <el-table :data="tableData" table-layout="fixed" v-if="size === Screen.Large"
                :header-cell-style="{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: '300', borderBottom: 'none', backgroundColor: '#F9F9F8' }"
                :cell-style="{ color: '#000', height: '36px', fontSize: '14px', fontWeight: '500', textAlign: 'center', borderBottom: '0.5px solid rgba(140, 233, 220,0.5)', backgroundColor: '#F9F9F8' }">
                <el-table-column type="index" label="排行" />
                <el-table-column prop="accountName" label="账户名"></el-table-column>
                <el-table-column prop="label" label="标签"></el-table-column>
                <el-table-column label="余额">
                    <template #default="scope">
                        <div style="color:  #0FACB6;">{{ scope.row.balance }} UNC</div>
                    </template>
                </el-table-column>
                <el-table-column prop="balanceRatio" label="余额占比"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="latestTransaction" label="最新交易"></el-table-column>
            </el-table>
            <div v-else style="padding-bottom: 20px;">
                <div>
                    <div v-for="(item, index) in tableData" :key="index">
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-12-300">
                                    排行
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ index + 1 }}
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-12-300">
                                    账户名
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ item.accountName }}
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-12-300">
                                    标签
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ item.label }}
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-14-300">
                                    余额
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14" style="color: #0FACB6;">
                                    {{ item.balance }} UNC
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-14-300">
                                    余额占比
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ item.balanceRatio }}
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-14-300">
                                    类型
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ item.type }}
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-14-300">
                                    创建时间
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ item.createTime }}
                                </div>
                            </div>
                        </div>
                        <div class="eco-item">
                            <div>
                                <div class="grey-text-14-300">
                                    最新交易
                                </div>
                            </div>
                            <div>
                                <div class="black-text-14">
                                    {{ item.latestTransaction }}
                                </div>
                            </div>
                        </div>
                        <!--        最后一条数据去除分隔线-->
                        <div v-if="index !== tableData.length - 1" class="eco-line"></div>
                    </div>
                </div>
            </div>
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
        // margin-left: 62px;
        margin: 39px auto 36px;

        .block_list_header {
            height: 40px;
            border-radius: 8px;
            background: #FFF;
            padding-left: 26px;
            box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            .block_list_header_title {
                color: #000;
                font-family: PingFang SC;
                font-size: 16px;
                font-weight: 500;
                margin-right: 26px;
            }

            .block_list_header_text {
                color: #0FACB6;
                font-family: PingFang SC;
                font-size: 14px;
                font-weight: 400;
                opacity: 0.7;
            }
        }
    }
}

@media (min-width: 320px) and (max-width: 843px) {
    .content {
        .block_list {
            width: calc(100% - 36px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin: 0 18px 36px;
            box-sizing: border-box;

            .block_list_header {
                .block_list_header_title {
                    font-size: 14px;
                }
            }
        }

        .eco-item2 {
            display: flex;
            justify-content: start;
            align-items: center;
        }
    }
}
</style>