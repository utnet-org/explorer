<script setup lang="ts">
  // 最新区块
  import { onMounted, onUnmounted, reactive } from 'vue';
  import {
    type BlockInfo,
    getBlockInfo,
    getLastBlock,
    LastBlock,
  } from '@/api/block.ts';
  import { CompareStrTimeNano, CompareTimestampNano } from '@/utils/time.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const porps = defineProps<{ fromPage: string }>();
  const size = getScreenSize().currentScreenSize;
  let intervalId: number | undefined;

  const blockDatas = reactive<BlockInfo[]>([{}]);
  const lastBlocks = reactive<LastBlock[]>([{}]);

  async function fetchBlockInfo() {
    const res = await getBlockInfo();
    Object.assign(blockDatas, res.data.data);
  }

  async function fetchLastBlock() {
    const res = await getLastBlock();
    Object.assign(lastBlocks, res.data.data);
  }

  onMounted(() => {
    fetchLastBlock();
    intervalId = window.setInterval(() => {
      // fetchBlockInfo();
      fetchLastBlock();
    }, 5000);
  });

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  });
  const goToMore = () => {
    localStorage.setItem('navSelectIndex', '0');
    window.location.reload();
    window.location.href = '/blockchain';
  };

  const heightClick = (height: number) => {
    void router.push({
      path: '/blockchain/details',
      query: { query_word: height, query_type: 1 },
    });
  };
  const BlockClick = (query_word: string) => {
    void router.push({
      path: '/blockchain/details',
      query: { query_word: query_word, query_type: 2 },
    });
    console.log('heightClick', query_word);
  };
</script>
<template>
  <div
    class="new_block_content"
    :style="porps.fromPage == 'blockChain' ? 'margin-top:60px !important;' : ''"
  >
    <div class="new_block_content_header">
      <div class="new_block_content_header_title">{{
        $t('home.latest_block')
      }}</div>
      <!--      <div class="new_block_content_header_button">查看更多</div>-->
    </div>
    <div v-if="size !== Screen.Large" class="eco-line"></div>
    <div v-if="size === Screen.Large">
      <div>
        <el-table
          :data="lastBlocks"
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
          }"
          :highlight-current-row="true"
        >
          <el-table-column prop="height" :label="$t('home.height')">
            <template #default="scope">
              <div
                @click="heightClick(scope.row.height)"
                style="cursor: pointer"
              >
                <div style="color: #0facb6; font-size: 14px"
                  >{{ scope.row.height }}
                </div>
                <div style="color: #6a6a69; font-size: 12px"
                  >{{ CompareStrTimeNano(scope.row.timestamp) }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('home.hash')" prop="hash">
            <template #default="scope">
              <el-tooltip
                effect="dark"
                :content="scope.row.author"
                placement="top"
              >
                <div
                  class="text-ellipsis"
                  style="cursor: pointer"
                  @click="BlockClick(scope.row.hash)"
                >
                  {{ scope.row.hash }}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('account')" prop="author">
            <template #default="{ row }">
              <el-tooltip effect="dark" :content="row.author" placement="top">
                <div class="text-ellipsis">{{ row.author }}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column :label="$t('home.tag')">
            <!--            <template #default="scope">-->
            <!--                      <div v-for="(item, index) in scope.row.tags" :key="index">{{ item }}</div>-->
            <!--              <div v-for="index in scope.row.tags" :key="index">Utility</div>-->
            <div>Utility</div>
            <!--            </template>-->
          </el-table-column>
          <el-table-column :label="$t('home.message')" prop="messages">
            <!--            <template #default="scope">-->
            <!--              <div v-for="(item, index) in scope.row.messages" :key="index"-->
            <!--                >{{ item }}-->
            <!--              </div>-->
            <!--            </template>-->
          </el-table-column>
          <!--          <el-table-column :label="$t('home.reward')">-->
          <!--            <template #default="scope">-->
          <!--              <div v-for="(item, index) in scope.row.rewards" :key="index"-->
          <!--                >{{ item }} UNC-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
      </div>
    </div>
    <div v-else>
      <div>
        <div v-for="(item, index) in blockDatas" :key="index">
          <div class="eco-item">
            <div class="eco-item2">
              <div class="grey-text-12-300" style="padding-right: 5px"
                >{{ $t('home.height') }}
              </div>
              <div class="second-text-14-500">{{ index }}</div>
            </div>
            <div class="black-text-14-500"
              >{{ CompareTimestampNano(item.latest) }}
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
    <!-- <div class="open_more" @click="goToMore">{{ $t('home.see_more') }}</div> -->
  </div>
</template>
<style scoped lang="scss">
  .text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (min-width: 1024px) {
    .new_block_content {
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
