<script setup lang="ts">
  // 消息列表
  import { onMounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  // import Mock from 'mockjs';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import { Search } from '@element-plus/icons-vue';
  import paginationContent from '@/components/PaginationContent.vue';
  // defineProps<{ msg: string }>()
  const size = getScreenSize().currentScreenSize;
  const searchMessage = ref('');
  onMounted(() => {});
  const tableData = [
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
    },
    {
      messageId: 'baf...azy',
      blockHeight: '3292964',
      time: '1分13秒前',
      sender: 'f3wc2vre...7hjss21iq',
      receiver: 'f10923786',
      method: 'SubmitWindowedPoSt',
      amount: '0',
      status: 'OK',
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
        <div class="block_list_header_side">
          <div class="block_list_header_title">{{
            $t('home.Message_list')
          }}</div>
          <div class="block_list_header_text"
            >{{ $t('contract.common') }} 1141606363
            {{ $t('contract.messages') }}</div
          >
        </div>
        <el-input
          v-if="size === Screen.Large"
          style="width: 30%; height: 30px; margin-right: 20px"
          v-model="searchMessage"
          :placeholder="$t('home.Search_for_clients_or_miner')"
          :suffix-icon="Search"
          clearable
        />
      </div>
      <div class="search" v-if="size === Screen.Small">
        <el-input
          style="width: 50%; height: 40px"
          v-model="searchMessage"
          :placeholder="$t('home.Search_for_clients_or_miner')"
          :suffix-icon="Search"
          clearable
        />
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
        <el-table-column
          prop="messageId"
          :label="$t('home.message_id')"
        ></el-table-column>
        <el-table-column :label="$t('home.height')">
          <template #default="scope">
            <div style="color: #0facb6">{{ scope.row.blockHeight }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="time" :label="$t('home.time')"></el-table-column>
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
            <span>{{ scope.row.amount }}</span>
            <span>UNC</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          :label="$t('home.status')"
        ></el-table-column>
      </el-table>
      <div v-else style="padding-bottom: 20px">
        <div>
          <div v-for="(item, index) in tableData" :key="index">
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 消息ID </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.messageId }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> {{ $t('home.height') }} </div>
              </div>
              <div>
                <div class="black-text-14" style="color: #0facb6">
                  {{ item.blockHeight }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 时间 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.time }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> {{ $t('home.sender') }} </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.sender }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> {{ $t('home.receiver') }} </div>
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
                <div class="black-text-14">
                  {{ item.method }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 金额 </div>
              </div>
              <div>
                <div class="black-text-14"> {{ item.amount }}UNC </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 状态 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.status }}
                </div>
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
  .pagination {
    position: absolute;
    z-index: 100;
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
        height: 50px;
        border-radius: 8px;
        background: #fff;
        padding-left: 26px;
        box-shadow:
          0px 4px 15px 0px rgba(92, 255, 243, 0.1),
          0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .block_list_header_side {
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

      .search {
        width: 100%;
        padding: 22px 35px 20px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
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

        .search {
          padding: 10px 15px 15px 0;
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
