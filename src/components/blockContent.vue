<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { BlockInfo, getBlockInfo } from '@/api/block.ts';
  import Mock from 'mockjs';
  import { updateTimeAgo } from '@/utils/time.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';

  const porps = defineProps<{ fromPage: string }>();
  const size = getScreenSize().currentScreenSize;
  let intervalId: number | undefined;

  let blockDatas = reactive<BlockInfo[]>([{}]);
  let heights = ref<number[]>([]);

  async function fetchBlockInfo() {
    const res = await getBlockInfo();
    // console.log(res.data.data);
    Object.assign(blockDatas, res.data.data);
  }

  onMounted(() => {
    const initialHeight = Mock.Random.integer(3000000, 4000000);
    // 从大到小排列
    heights.value = Array.from(
      { length: 10 },
      (_, index) => initialHeight - index,
    );
    // 每3秒更新数据
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
</script>
<template>
  <div
    class="new_block_content"
    :style="porps.fromPage == 'blockChain' ? 'margin-top:60px !important;' : ''"
  >
    <div class="new_block_content_header">
      <div class="new_block_content_header_title">最新区块</div>
      <!--      <div class="new_block_content_header_button">查看更多</div>-->
    </div>
    <div v-if="size !== Screen.Large" class="eco-line"></div>
    <div v-if="size === Screen.Large">
      <div>
        <el-table
          :data="blockDatas"
          table-layout="fixed"
          height="404px"
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
            backgroundColor: '#F9F9F8',
          }"
        >
          <!--        <el-table-column prop="height" label="高度">-->
          <el-table-column prop="height" label="高度">
            <template #default="scope">
              <div style="color: #0facb6; margin-bottom: 8px; font-size: 14px"
                >{{ heights[scope.$index] }}
              </div>
              <div style="color: #6a6a69; font-size: 12px"
                >{{ updateTimeAgo(scope.row.latest) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="区块ID">
            <template #default="scope">
              <div v-for="(item, index) in scope.row.ids" :key="index"
                >{{ item }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="算力提供者">
            <template #default="scope">
              <div v-for="(item, index) in scope.row.miners" :key="index"
                >{{ item }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="标签">
            <template #default="scope">
              <!--                      <div v-for="(item, index) in scope.row.tags" :key="index">{{ item }}</div>-->
              <div v-for="index in scope.row.tags" :key="index">Utility</div>
            </template>
          </el-table-column>
          <el-table-column label="消息">
            <template #default="scope">
              <div v-for="(item, index) in scope.row.msgs" :key="index"
                >{{ item }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="奖励">
            <template #default="scope">
              <div v-for="(item, index) in scope.row.rewards" :key="index"
                >{{ item }} UNC
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else>
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
              >{{ updateTimeAgo(item.latest) }}
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
    <div class="open_more">查看更多</div>
  </div>
</template>
<style scoped lang="scss">
  @media screen and (min-width: 1024px) {
    .new_block_content {
      // height: 393px;
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0px 4px 15px 0px rgba(92, 255, 243, 0.1),
        0px 4px 8px 0px rgba(0, 0, 0, 0.04);
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

      .new_block_content_header {
        padding: 19px 22px 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .new_block_content_header_title {
          color: #000;
          font-family: $primary-font-family;
          font-size: 16px;
          font-weight: 500;
        }

        .new_block_content_header_button {
          color: #191919;
          font-family: $primary-font-family;
          font-size: 14px;
          font-weight: 400;
          padding: 4px 23px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow:
            2px 2px 2px 0px rgba(0, 209, 255, 0.02) inset,
            -2px -2px 2px 0px rgba(0, 209, 255, 0.02) inset;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 1023px) {
    .new_block_content {
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0 4px 15px 0 rgba(92, 255, 243, 0.1),
        0 4px 8px 0 rgba(0, 0, 0, 0.04);
      margin: 32px 21px;

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

      .new_block_content_header {
        padding: 19px 22px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .new_block_content_header_title {
          color: #000;
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: 500;
        }

        .new_block_content_header_button {
          color: #191919;
          font-family: PingFang SC;
          font-size: 14px;
          font-weight: 400;
          padding: 4px 23px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow:
            2px 2px 2px 0px rgba(0, 209, 255, 0.02) inset,
            -2px -2px 2px 0px rgba(0, 209, 255, 0.02) inset;
          cursor: pointer;
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
