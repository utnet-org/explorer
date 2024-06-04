<script setup lang="ts">
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import { CompareTimestampNano } from '@/utils/time.ts';
  import { defineProps, defineEmits } from 'vue';
  import { TxnInfo } from '@/api/transaction.ts';
  import router from '@/route/route.ts';
  import PaginationContent from '@/components/PaginationContent.vue';

  const size = getScreenSize().currentScreenSize;
  const props = defineProps<{
    tableData: TxnInfo[];
    pageSize: number;
    currentPage: number;
    total: number;
  }>();

  const emits = defineEmits<{
    (e: 'updatePage', value: number): void;
  }>();

  const handlePageChange = (page: number) => {
    emits('updatePage', page);
  };

  const tableClick = (row: any) => {
    router.push({
      path: '/blockchain/transactionDetails',
      query: { hash: row.hash },
    });
  };
</script>

<template>
  <div class="block_list_header">
    <div class="block_list_header_side">
      <div class="block_list_header_title">交易列表</div>
      <div class="block_list_header_text">共 {{ props.total }} 条消息</div>
    </div>
  </div>
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
        <el-tooltip effect="dark" :content="row.receiver_id" placement="top">
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
            <div class="black-text-14"> {{ item.txn_fee.toFixed(6) }} UNC </div>
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
  <div class="paging">
    <PaginationContent
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      :show-button="true"
      :onPageChange="handlePageChange"
    />
  </div>
</template>

<style scoped lang="scss">
  .paging {
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

  .block_list_header_side {
    display: flex;
    align-items: center;
    border-radius: 8px;
    background: #fff;
    padding-left: 26px;
    height: 50px;
    box-shadow:
      0px 4px 15px 0px rgba(92, 255, 243, 0.1),
      0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    margin-bottom: 10px;
    .block_list_header_title {
      color: #000;
      font-size: 16px;
      font-weight: 500;
      margin-right: 15px;
    }
    .block_list_header_text {
      color: #0facb6;
      font-size: 14px;
      font-weight: 400;
      opacity: 0.7;
    }
  }

  .content {
    width: 100%;
    min-height: 100vh;
    background: #f2f0ea;
    position: relative;
    padding-bottom: 100px;

    .search {
      width: 100%;
      padding: 22px 35px 20px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
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
