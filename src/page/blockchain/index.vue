<script setup lang="ts">
  // 最新区块
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  import { BlockInfo, getBlockInfo } from '@/api/block.ts';
  import Mock from 'mockjs';
  import { getTimeDiffFromTimestamp,updateTimeAgo } from '@/utils/time.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import paginationContent from '@/components/paginationContent.vue';
  import { useRouter } from 'vue-router';
import { ApiBlockList } from '@/api/chart';

  const router = useRouter();
  // defineProps<{ msg: string }>()
  // const count = ref(0)
  // const windowWidth = ref(document.documentElement.clientWidth);
  const size = getScreenSize().currentScreenSize;
  let intervalId: number | undefined;
  let heights = ref<number[]>([]);
  let blockDatas = reactive<BlockInfo[]>([{}]);
  async function fetchBlockInfo() {
    const res = await getBlockInfo();
    // console.log(res.data.data);
    Object.assign(blockDatas, res.data.data);
  }
  const blockList = ref([]);
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(20); // 每页显示条目数，您想要显示5个
  const totalItems = ref(0); // 总条目数，即您数组的长度
  // 监听窗口大小变化
  onMounted(async () => {
    const initialHeight = Mock.Random.integer(3000000, 4000000);
    // 从大到小排列
    heights.value = Array.from(
      { length: 10 },
      (_, index) => initialHeight - index,
    );
    intervalId = window.setInterval(() => {
      fetchBlockInfo();
      // 更新数组：增加每个元素的值
      heights.value = heights.value.map(h => h + 1);
      // height.value += 1;
    }, 3000);

    const res = await ApiBlockList({
      page_num: currentPage,
      page_size: pageSize,
    })
    console.log('res',res.data.data);
    totalItems.value = res.data.data.total;
    blockList.value = res.data.data.block_list;
  });
  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
      
    }
  });


  // 处理页码改变
  const handlePageChange = async (page: number) => {
    console.log('page', page, pageSize.value);
    
    const res = await ApiBlockList({
      page_num: page,
      page_size: pageSize,
    })
    console.log('res', res.data.data);
    totalItems.value = res.data.data.total;
    blockList.value = res.data.data.block_list;
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const heightClick = (height: number) => {
    void router.push({
      path: '/blockchain/details',
      query: { query_word: height, query_type: 1 },
    });
  };
</script>
<template>
  <div class="content">
    <!-- 头部 -->
    <HeaderPage />
    <div
      :style="size === Screen.Large ? 'height: 160px' : 'height: 180px'"
    ></div>
    <div class="block_list">
      <div class="block_list_header">{{ $t('home.latest_block') }}</div>
      <el-table
        :data="
          blockList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
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
          height: '36px',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          borderBottom: '0.5px solid rgba(140, 233, 220,0.5)',
          // backgroundColor: '#F9F9F8',
        }"
        :highlight-current-row="true"
      >
        <el-table-column prop="height" :label="$t('home.high')">
          <template #default="scope">
            <div style="cursor: pointer" @click="heightClick(scope.row.height)">
              <div
                style="color: #0facb6; margin-bottom: 8px; font-size: 14px"
                >{{ scope.row.height }}</div
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hash" :label="$t('home.hash')">
        </el-table-column>
        <el-table-column prop="timestamp" :label="$t('home.time')">
          <template #default="scope">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              {{ getTimeDiffFromTimestamp(scope.row.timestamp) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="transactions" :label="$t('home.trade')">
          
        </el-table-column>
        <el-table-column prop="author" :label="$t('home.Miner')">
         
        </el-table-column>
        <el-table-column prop="gas_used" :label="$t('home.Gas_used')">
        
        </el-table-column>
        <el-table-column prop="gas_limit" :label="$t('home.Gas_limit')">
         
        </el-table-column>
        <el-table-column prop="gas_price" :label="$t('home.Gas_price')">
        
        </el-table-column>
        <el-table-column prop="gas_fee" :label="$t('home.Gas_fee')">
        
        </el-table-column>
        <el-table-column prop="prev_hash" :label="$t('home.parent_hash')">
         
        </el-table-column>
      </el-table>
      <div v-else style="padding-bottom: 20px">
        <div>
          <div v-for="(item, index) in blockDatas" :key="index">
            <div class="eco-item">
              <div class="eco-item2">
                <div class="grey-text-12-300" style="padding-right: 5px"
                  >高度
                </div>
                <!--              <div class="second-text-14-500">{{ item.height }}</div>-->
                <div class="second-text-14-500">{{ heights[index] }}</div>
              </div>
              <div class="black-text-14-500"
                >{{ updateTimeAgo(Number(item.latest)) }}
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div
                  class="grey-text-14-300"
                  v-for="(miner, index) in item.miners"
                  :key="index"
                >
                  {{ miner }}
                </div>
              </div>
              <div>
                <div
                  class="black-text-14"
                  v-for="(reward, index) in item.rewards"
                  :key="index"
                >
                  {{ reward }} UNC
                </div>
              </div>
            </div>
            <!--        最后一条数据去除分隔线-->
            <div v-if="index !== blockDatas.length - 1" class="eco-line"></div>
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
        :page-change="handlePageChange"
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
        line-height: 40px;
        border-radius: 8px;
        background: #fff;
        padding-left: 26px;
        box-shadow:
          0px 4px 15px 0px rgba(92, 255, 243, 0.1),
          0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        color: #000;
        font-family: PingFang SC;
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
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
      }

      .eco-item2 {
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }
  }
</style>
