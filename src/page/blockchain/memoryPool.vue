<script setup lang="ts">
  // 内存池消息列表
  import { onMounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  // import Mock from 'mockjs';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import paginationContent from '@/components/paginationContent.vue';
  // defineProps<{ msg: string }>()
  const size = getScreenSize().currentScreenSize;
  onMounted(() => {});
  const tableData = [
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
    {
      memoryPoolId: 'f3wc2vre...7hjss21iq',
      createTime: '2020-10-21 11:13:30',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10232129',
      method: 'ProveCommitSector',
      amount: '0',
      gasLimit: '80,234.092',
      gasPremium: '100,400',
    },
  ];
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(20); // 每页显示条目数，您想要显示5个
  const totalItems = ref(tableData.length); // 总条目数，即您数组的长度
  // 处理页码改变
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };
</script>
<template>
  <div class="content">
    <HeaderPage />
    <div
      :style="size === Screen.Large ? 'height: 160px' : 'height: 180px'"
    ></div>
    <div class="block_list">
      <div class="block_list_header">
        <div class="block_list_header_title">{{
          $t('home.Memory_pool_message_list')
        }}</div>
        <div class="block_list_header_text">共 676 条消息</div>
      </div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        table-layout="fixed"
        v-if="size === Screen.Large"
        :header-cell-style="{
          textAlign: 'center',
          color: 'rgba(0,0,0,0.5)',
          fontSize: '12px',
          fontWeight: '300',
          borderBottom: 'none',
          backgroundColor: '#F9F9F8',
        }"
        :cell-style="{
          color: '#000',
          height: '52px',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          borderBottom: '0.5px solid rgba(140, 233, 220,0.5)',
          // backgroundColor: '#F9F9F8',
        }"
        :highlight-current-row="true"
      >
        <el-table-column prop="memoryPoolId" label="ID" />
        <el-table-column
          prop="createTime"
          :label="$t('home.creation_time')"
        ></el-table-column>
        <el-table-column
          prop="sender"
          :label="$t('home.sender')"
        ></el-table-column>
        <el-table-column
          prop="receiver"
          :label="$t('home.receiver')"
        ></el-table-column>
        <el-table-column :label="$t('home.method')">
          <template #default="scope">
            <div style="color: #0facb6">{{ scope.row.method }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.Amount')">
          <template #default="scope">
            <div>{{ scope.row.amount }} UNC</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gasLimit"
          :label="$t('home.gas_limit')"
        ></el-table-column>
        <el-table-column label="Gas Premium">
          <template #default="scope">
            <div>{{ scope.row.gasPremium }} attoFil</div>
          </template>
        </el-table-column>
      </el-table>
      <div v-else style="padding-bottom: 20px">
        <div>
          <div v-for="(item, index) in tableData" :key="index">
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> ID </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.memoryPoolId }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 创建时间 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.createTime }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 发送方 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.sender }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 接收方 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.receiver }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 方法 </div>
              </div>
              <div>
                <div class="black-text-14" style="color: #0facb6">
                  {{ item.method }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 金额 </div>
              </div>
              <div>
                <div class="black-text-14"> {{ item.amount }} UNC </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> gas限额 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.gasLimit }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> Gas Premium </div>
              </div>
              <div>
                <div class="black-text-14"> {{ item.gasPremium }} attoFil </div>
              </div>
            </div>
            <!--        最后一条数据去除分隔线-->
            <div v-if="index !== tableData.length - 1" class="eco-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagin">
      <paginationContent
        :total-items="totalItems"
        :page-size="pageSize"
        :current-page="currentPage"
        :show-button="true"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
  .pagin {
    position: absolute;
    z-index: 10;
    width: 100%;
  }
  .content {
    width: 100%;
    min-height: 100vh;
    background: #f2f0ea;
    position: relative;
    padding-bottom: 100px;
    .block_list {
      width: calc(100% - 64px);
      // height: 500px;
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0px 4px 15px 0px rgba(92, 255, 243, 0.1),
        0px 4px 8px 0px rgba(0, 0, 0, 0.04);
      position: relative;
      z-index: 10;
      // margin-left: 62px;
      margin: 39px auto 0px;

      .block_list_header {
        height: 40px;
        border-radius: 8px;
        background: #fff;
        padding-left: 26px;
        box-shadow:
          0px 4px 15px 0px rgba(92, 255, 243, 0.1),
          0px 4px 8px 0px rgba(0, 0, 0, 0.04);
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
          color: #0facb6;
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
