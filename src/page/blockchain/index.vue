<script setup lang="ts">
  // 最新区块
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  import { BlockInfo, getBlockInfo } from '@/api/block.ts';
  import Mock from 'mockjs';
  import { updateTimeAgo } from '@/utils/time.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import paginationContent from '@/components/paginationContent.vue';
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
  //监听窗口大小变化
  onMounted(() => {
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
  });
  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  });
  const tableData = [
    {
      id: 1,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 2,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: [
        'baf...azy',
        'baf...azy',
        'baf...azy',
        'baf...azy',
        'baf...azy',
      ],
    },
    {
      id: 3,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 4,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 5,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 6,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 7,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 8,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 9,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 10,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
    {
      id: 11,
      date: '+8.34%',
      name: 'MineFi',
      address: 'No. 189, Grove St, Los Angeles',
      newBlockList: ['baf...azy', 'baf...azy', 'baf...azy'],
    },
  ];
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(10); // 每页显示条目数，您想要显示5个
  const totalItems = ref(tableData.length); // 总条目数，即您数组的长度
  // 处理页码改变
  const handlePageChange = (page: number) => {
    currentPage.value = page;
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
          height: '36px',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          borderBottom: '0.5px solid rgba(140, 233, 220,0.5)',
          // backgroundColor: '#F9F9F8',
        }"
        :highlight-current-row="true"
      >
        <el-table-column prop="name" :label="$t('home.high')">
          <template #default="">
            <div style="color: #0facb6; margin-bottom: 8px; font-size: 14px"
              >3292964</div
            >
            <div style="color: #6a6a69; font-size: 12px">1分13秒前</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.block_id')">
          <template #default="scope">
            <div v-for="(item, index) in scope.row.newBlockList" :key="index">{{
              item
            }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.Computing_power_provider')">
          <template #default="scope">
            <div v-for="index in scope.row.newBlockList" :key="index"
              >f01234921</div
            >
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.tag')">
          <template #default="scope">
            <div v-for="index in scope.row.newBlockList" :key="index">---</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.message')">
          <template #default="scope">
            <div v-for="index in scope.row.newBlockList" :key="index">66</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('home.reward')">
          <template #default="scope">
            <div v-for="index in scope.row.newBlockList" :key="index"
              >11.23 UNC</div
            >
          </template>
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
    <paginationContent
      :totalItems="totalItems"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :showButton="true"
      @pageChange="handlePageChange"
    />
  </div>
</template>
<style scoped lang="scss">
  .content {
    width: 100%;
    min-height: 100vh;
    background: #f2f0ea;
    position: relative;

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
