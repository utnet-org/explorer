<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import paginationContent from '@/components/paginationContent.vue';
  const size = getScreenSize().currentScreenSize;
  import { useRouter } from 'vue-router';
  import { getTxnList } from '@/api/transaction.ts';
  import { CompareTimestampNano } from '@/utils/time.ts';

  const router = useRouter();

  // let intervalId: number | undefined;
  onMounted(() => {
    fetchTxnList(currentPage.value, pageSize.value);
    // intervalId = window.setInterval(() => {
    //   fetchTxnList(currentPage.value, pageSize.value);
    // }, 5000);
  });
  onUnmounted(() => {
    // if (intervalId !== undefined) {
    //   clearInterval(intervalId);
    // }
  });
  const tableData = ref([]);
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(20); // 每页显示条目数，您想要显示5个
  const totalItems = ref(tableData.length); // 总条目数，
  const fetchTxnList = async (page: number, size: number) => {
    const res = await getTxnList(page, size);
    totalItems.value = res.data.data.total;
    tableData.value = res.data.data.txn_list;
  };
  // 处理页码改变
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

  const tableClick = (row: any) => {
    // 获取点击行的 TxnHash 属性的值
    const txnHash = row.id;
    console.log('Clicked TxnHash:', txnHash);
    router.push('/blockchain/transactionDetails');
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
          <div class="block_list_header_title">交易列表</div>
          <div class="block_list_header_text">共 {{ totalItems }} 条消息</div>
        </div>
        <!--        <el-input-->
        <!--          v-if="size === Screen.Large"-->
        <!--          style="width: 30%; height: 30px; margin-right: 20px"-->
        <!--          v-model="searchMessage"-->
        <!--          :placeholder="$t('home.Search_for_clients_or_miner')"-->
        <!--          :suffix-icon="Search"-->
        <!--          clearable-->
        <!--        />-->
      </div>
      <!--      <div class="search" v-if="size === Screen.Small">-->
      <!--        <el-input-->
      <!--          style="width: 50%; height: 40px"-->
      <!--          v-model="searchMessage"-->
      <!--          :placeholder="$t('home.Search_for_clients_or_miner')"-->
      <!--          :suffix-icon="Search"-->
      <!--          clearable-->
      <!--        />-->
      <!--      </div>-->
      <el-table
        :data="tableData"
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
          cursor: 'pointer',
        }"
        :highlight-current-row="true"
        @row-click="tableClick"
      >
        <el-table-column prop="hash" label="交易哈希">
          <template #default="{ row }">
            <el-tooltip effect="dark" :content="row.hash" placement="top">
              <div class="text-ellipsis">{{ row.hash }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="类型">
          <template #default="{ row }">
            <div style="color: #0facb6">
              <span v-if="row.txn_type">{{ row.txn_type }}</span>
              <span v-else>未知</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="deposit" label="存款价值">
          <template #default="{ row }">
            <span v-if="row.deposit">{{ row.deposit }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column prop="txn_fee" label="TXN费用">
          <template #default="{ row }">
            <span>{{ row.txn_fee.toFixed(6) }} UNC</span>
          </template>
        </el-table-column>
        <el-table-column prop="signer_id" label="发送方">
          <template #default="{ row }">
            <el-tooltip effect="dark" :content="row.signer_id" placement="top">
              <div class="text-ellipsis">{{ row.signer_id }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="接收方">
          <template #default="{ row }">
            <el-tooltip
              effect="dark"
              :content="row.receiver_id"
              placement="top"
            >
              <div class="text-ellipsis" style="color: #0facb6">{{
                row.receiver_id
              }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="height" label="块高度"> </el-table-column>
        <el-table-column prop="timestamp" label="块龄">
          <template #default="{ row }">
            <span>{{ CompareTimestampNano(row.timestamp) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-else style="padding-bottom: 20px">
        <div>
          <div v-for="(item, index) in tableData" :key="index">
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 交易哈希</div>
              </div>
              <div>
                <div class="black-text-14 text-ellipsis" style="width: 200px">
                  {{ item.hash }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 类型</div>
              </div>
              <div>
                <div class="black-text-14">
                  <span v-if="item.txn_type">{{ item.txn_type }}</span>
                  <span v-else>未知</span>
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 存款价值</div>
              </div>
              <div>
                <div class="black-text-14">
                  <span v-if="item.deposit">{{ item.deposit }}</span>
                  <span v-else>0</span>
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> 交易费用</div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.txn_fee.toFixed(6) }} UNC
                </div>
              </div>
            </div>

            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 发送方</div>
              </div>
              <div>
                <div class="black-text-14 text-ellipsis" style="width: 200px">
                  {{ item.signer_id }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 接收方</div>
              </div>
              <div>
                <div class="black-text-14 text-ellipsis" style="width: 200px">
                  {{ item.receiver_id }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 区块高度</div>
              </div>
              <div>
                <div class="black-text-14" style="color: #0facb6">
                  {{ item.height }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 时间</div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.timestamp }}
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
        :total="totalItems"
        :page-size="pageSize"
        :current-page="currentPage"
        :show-button="true"
        :onPageChange="handlePageChange"
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

  .text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
