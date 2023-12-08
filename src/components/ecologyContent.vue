<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { EcoInfo, getEcoInfo } from '@/api/ecosystem.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';

  /// 生态导览
  defineProps<{ viewportWidth: number }>();
  // 24h, week, month, year 时间相关数据及变量
  // const ecologyTimeTypeList = ['24小时', '周', '月', '年'];
  const checkEcologyTimeType = ref('24h');
  const changeTimeType = (item: string) => {
    checkEcologyTimeType.value = item;
  };
  //tabs相关数据及变量
  // const ecologyTabsList = ['DeFi(12)', 'Community', 'Wallet(3)'];
  const checkEcologyTabs = ref('DeFi(12)');
  const changeTabsType = (item: string) => {
    checkEcologyTabs.value = item;
  };

  const size = getScreenSize().currentScreenSize;

  let intervalId: number | undefined;

  let ecoDatas = reactive<EcoInfo[]>([{}]);

  async function fetchEcoInfo() {
    const res = await getEcoInfo();
    Object.assign(ecoDatas, res.data.data);
    console.log(res.data.data);
  }

  onMounted(() => {
    // 每3秒更新数据
    intervalId = window.setInterval(() => {
      fetchEcoInfo();
    }, 3000);
  });

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  });
</script>
<template>
  <div class="ecology_content">
    <div class="ecology_header">
      <div class="ecology_title">{{ $t('home.eco_tour') }}</div>
      <div class="ecology_time">
        <el-button
          size="small"
          :color="checkEcologyTimeType == timeItem ? '#3EDFCF' : ''"
          @click="changeTimeType(timeItem)"
          :style="{
            fontWeight: checkEcologyTimeType == timeItem ? '500' : '300',
            fontSize: '14px',
            border: '0.5px solid #3EDFCF',
            borderRadius: '2px',
          }"
          v-for="(timeItem, timeIndex) in [
            $t('home.hour'),
            $t('home.week'),
            $t('home.month'),
            $t('home.year'),
          ]"
          :key="timeIndex"
          >{{ timeItem }}
        </el-button>
      </div>
    </div>
    <div class="ecology_tabs">
      <div
        v-for="(tabsItem, tabsIndex) in [
          $t('home.defi') + '(12)',
          $t('home.community'),
          $t('home.wallet') + '(3)',
        ]"
        :key="tabsIndex"
        class="ecology_tabs_item"
        :class="checkEcologyTabs == tabsItem ? 'active' : ''"
        @click="changeTabsType(tabsItem)"
      >
        {{ tabsItem }}
      </div>
    </div>
    <div v-if="size !== Screen.Small">
      <div class="ecology_table">
        <el-table
          :data="ecoDatas"
          table-layout="fixed"
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
          <el-table-column type="index" :label="$t('home.rank')" width="55px" />
          <el-table-column prop="name" :label="$t('home.name')" />
          <el-table-column :label="$t('home.transactions')">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div>{{ scope.row.trans }}</div>
                <div style="margin-left: 7px">
                  <div v-if="scope.row.transPer > 0" style="color: #0facb6"
                    >+{{ scope.row.transPer }}%
                  </div>
                  <div
                    v-else-if="scope.row.transPer <= 0"
                    style="color: palevioletred"
                    >{{ scope.row.transPer }}%
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('home.address')">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div>{{ scope.row.uniAddr }}</div>
                <div style="margin-left: 7px">
                  <div v-if="scope.row.uniAddrPer > 0" style="color: #0facb6"
                    >+{{ scope.row.uniAddrPer }}%
                  </div>
                  <div
                    v-else-if="scope.row.uniAddrPer <= 0"
                    style="color: palevioletred"
                    >{{ scope.row.uniAddrPer }}%
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('home.lock_UNC')">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div>${{ scope.row.locked }}M USD</div>
                <div style="margin-left: 7px">
                  <div v-if="scope.row.lockedPer > 0" style="color: #0facb6"
                    >+{{ scope.row.lockedPer }}%
                  </div>
                  <div
                    v-else-if="scope.row.lockedPer <= 0"
                    style="color: palevioletred"
                    >{{ scope.row.lockedPer }}%
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="TVL">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div>${{ scope.row.tvl }}M USD</div>
                <div style="margin-left: 7px">
                  <div v-if="scope.row.tvlPer > 0" style="color: #0facb6"
                    >+{{ scope.row.tvlPer }}%
                  </div>
                  <div
                    v-else-if="scope.row.tvlPer <= 0"
                    style="color: palevioletred"
                    >{{ scope.row.tvlPer }}%
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else-if="size === Screen.Small">
      <div style="padding: 0 0 5px 18px" class="primary-text-14-500"
        >{{ $t('home.rank') }}
      </div>
      <div v-for="(item, index) in ecoDatas" :key="index">
        <div class="eco-rank-item">
          <!--          <div class="black-text-14">{{ item.rank }}</div>-->
          <div class="primary-text-14-500">{{ index + 1 }}</div>
        </div>
        <div class="eco-item">
          <div class="grey-text-12-300">{{ $t('home.name') }}</div>
          <div class="black-text-14-500">{{ item.name }}</div>
        </div>
        <div class="eco-item">
          <div class="grey-text-12-300">{{ $t('home.transactions') }}</div>
          <div class="eco-merge-value">
            <div class="black-text-14-500">&nbsp;{{ item.trans }}&nbsp;</div>
            <div v-if="item.transPer! > 0" class="second-text-12-500"
              >+{{ item.transPer }}%
            </div>
            <div v-else-if="item.transPer! <= 0" class="minus-text-12-500"
              >{{ item.transPer }}%
            </div>
          </div>
        </div>
        <div class="eco-item">
          <div class="grey-text-12-300">{{ $t('home.address') }}</div>
          <div class="eco-merge-value">
            <div class="black-text-14-500">&nbsp;{{ item.uniAddr }}&nbsp;</div>
            <div v-if="item.uniAddrPer! > 0" class="second-text-12-500"
              >+{{ item.uniAddrPer }}%
            </div>
            <div v-else-if="item.uniAddrPer! <= 0" class="minus-text-12-500"
              >{{ item.uniAddrPer }}%
            </div>
          </div>
        </div>
        <div class="eco-item">
          <div class="grey-text-12-300">{{ $t('home.lock_UNC') }}</div>
          <div class="eco-merge-value">
            <div class="black-text-14-500"
              >&nbsp;{{ item.locked }}M USD&nbsp;
            </div>
            <div v-if="item.lockedPer! > 0" class="second-text-12-500"
              >+{{ item.lockedPer }}%
            </div>
            <div v-else-if="item.lockedPer! <= 0" class="minus-text-12-500"
              >{{ item.lockedPer }}%
            </div>
          </div>
        </div>
        <div class="eco-item">
          <div class="grey-text-12-300">{{ $t('home.tvl') }}</div>
          <div class="eco-merge-value">
            <div class="black-text-14-500">&nbsp;{{ item.tvl }}M USD&nbsp;</div>
            <div v-if="item.tvlPer! > 0" class="second-text-12-500"
              >+{{ item.tvlPer }}%
            </div>
            <div v-else-if="item.tvlPer! <= 0" class="minus-text-12-500"
              >{{ item.tvlPer }}%
            </div>
          </div>
        </div>
        <!--        最后一条数据去除分隔线-->
        <div v-if="index !== ecoDatas.length - 1" class="eco-line"></div>
      </div>
    </div>
    <div class="open_more">{{ $t('home.see_more') }}</div>
  </div>
</template>
<style scoped lang="scss">
  @media screen and (min-width: 1024px) {
    .ecology_content {
      // height: 393px;
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0 4px 15px 0 rgba(92, 255, 243, 0.1),
        0 4px 8px 0 rgba(0, 0, 0, 0.04);
      margin: 32px 32px;

      .ecology_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 22px;
        padding: 19px 0 12px;
        border-bottom: 0.5px solid rgba(140, 233, 220, 0.5);

        .ecology_title {
          color: #000;
          font-family: $primary-font-family;
          font-size: 16px;
          font-weight: 500;
        }

        .ecology_time {
          display: flex;
          align-items: center;
          justify-content: end;
        }
      }

      .ecology_tabs {
        width: 286px;
        margin: 12px 22px 22px;
        display: flex;
        align-items: center;
        padding: 3px;
        border-radius: 38px;
        border: 0.5px solid #3edfcf;

        .ecology_tabs_item {
          // flex: 1;
          padding: 0 21px;
          text-align: center;
          color: #6a6a69;
          font-family: $primary-font-family;
          font-size: 12px;
          font-weight: 400;
          border-radius: 38px;
          cursor: pointer;
        }

        .active {
          font-weight: 600;
          color: #000;
          background-color: #9fdbd2;
        }
      }

      .ecology_table {
        width: 100%;
        padding: 0 22px;
        box-sizing: border-box;
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 1023px) {
    .ecology_content {
      // height: 393px;
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0 4px 15px 0 rgba(92, 255, 243, 0.1),
        0 4px 8px 0 rgba(0, 0, 0, 0.04);
      margin: 16px 21px;

      .ecology_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 22px;
        padding: 19px 0 12px;
        border-bottom: 0.5px solid rgba(140, 233, 220, 0.5);

        .ecology_title {
          color: #000;
          font-family: $primary-font-family;
          font-size: 16px;
          font-weight: 500;
        }

        .ecology_time {
          display: flex;
          align-items: center;
          justify-content: end;
        }
      }

      .ecology_tabs {
        width: 286px;
        margin: 12px 22px 22px;
        display: flex;
        align-items: center;
        padding: 3px;
        border-radius: 38px;
        border: 0.5px solid #3edfcf;

        .ecology_tabs_item {
          // flex: 1;
          padding: 0 21px;
          text-align: center;
          color: #6a6a69;
          font-family: $primary-font-family;
          font-size: 12px;
          font-weight: 400;
          border-radius: 38px;
          cursor: pointer;
        }

        .active {
          font-weight: 600;
          color: #000;
          background-color: #9fdbd2;
        }
      }

      .ecology_table {
        width: 100%;
        padding: 0 22px;
        box-sizing: border-box;
      }
    }
  }
</style>
