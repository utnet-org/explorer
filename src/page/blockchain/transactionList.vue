<script setup lang="ts">
  // 消息列表
  import { onMounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  // import Mock from 'mockjs';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import { Search } from '@element-plus/icons-vue';
  import paginationContent from '@/components/paginationContent.vue';
  // defineProps<{ msg: string }>()
  const size = getScreenSize().currentScreenSize;
  const searchMessage = ref('');
  import { useRouter } from 'vue-router';
  const router = useRouter();
  onMounted(() => {});
  const tableData = [
    {
      id: 1,
      TxnHash: 'BNjBCsvfDPJVS1MJv3ZUHbbknc9vPZkRv2fAN6mzgUM4',
      Method: '未知',
      DepositValue: '0Ⓝ',
      TxnFee: '0.00026Ⓝ',
      From: 'relay.tg',
      To: 'i7102151627.tg',
      BlockHeight: '116,375,717',
      AGe: '27 minutes ago',
    },
    {
      id: 2,
      TxnHash: 'BNjBCsvfDPJVS1MJv3ZUHbbknc9vPZkRv2fAN6mzgUM4',
      Method: '未知',
      DepositValue: '0Ⓝ',
      TxnFee: '0.00026Ⓝ',
      From: 'relay.tg',
      To: 'i7102151627.tg',
      BlockHeight: '116,375,717',
      AGe: '27 minutes ago',
    },
    {
      id: 3,
      TxnHash: 'BNjBCsvfDPJVS1MJv3ZUHbbknc9vPZkRv2fAN6mzgUM4',
      Method: '未知',
      DepositValue: '0Ⓝ',
      TxnFee: '0.00026Ⓝ',
      From: 'relay.tg',
      To: 'i7102151627.tg',
      BlockHeight: '116,375,717',
      AGe: '27 minutes ago',
    },
    {
      id: 4,
      TxnHash: 'BNjBCsvfDPJVS1MJv3ZUHbbknc9vPZkRv2fAN6mzgUM4',
      Method: '未知',
      DepositValue: '0Ⓝ',
      TxnFee: '0.00026Ⓝ',
      From: 'relay.tg',
      To: 'i7102151627.tg',
      BlockHeight: '116,375,717',
      AGe: '27 minutes ago',
    },
 
  ];
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(20); // 每页显示条目数，您想要显示5个
  const totalItems = ref(tableData.length); // 总条目数，即您数组的长度
  // 处理页码改变
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

const formatTxnHash = (row:any) => {
      // 获取 TxnHash 字段的值
      const txnHash = row.TxnHash;
      // 如果 TxnHash 存在并且长度大于12，则截取前12位并添加省略号，否则返回原始值
      return txnHash && txnHash.length > 12 ? txnHash.slice(0, 12) + '...' : txnHash;
    }


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
          <div class="block_list_header_text">共 1083059727 条消息</div>
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
          cursor: 'pointer',
        }"
        :highlight-current-row="true"
        @row-click="tableClick"
      >
        <el-table-column
          prop="TxnHash"
          label="交易哈希"
          :formatter="formatTxnHash"
        ></el-table-column>
        <el-table-column label="类型">
          <template #default="scope">
            <div style="color: #0facb6">{{ scope.row.Method }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="DepositValue" label="存款价值"></el-table-column>
        <el-table-column
          prop="TxnFee"
          label="TXN费用"
        ></el-table-column>
        <el-table-column
          prop="From"
          label="发送方"
        ></el-table-column>
        <el-table-column label="接收方">
          <template #default="scope">
            <div style="color: #0facb6">{{ scope.row.To }}</div>
          </template>
        </el-table-column>
        <el-table-column label="块高度">
          <template #default="scope">
            <span>{{ scope.row.BlockHeight }}</span>
            <span>UNC</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="AGe"
          label="块龄"
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
                  {{ formatTxnHash(item)}}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 区块高度 </div>
              </div>
              <div>
                <div class="black-text-14" style="color: #0facb6">
                  {{ item.Method }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 时间 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.DepositValue }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 发送方 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.TxnFee }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 接收方 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.From }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 方法 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.To }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 金额 </div>
              </div>
              <div>
                <div class="black-text-14"> {{ item.BlockHeight }}UNC </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300"> 状态 </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.AGe }}
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
