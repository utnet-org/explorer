<script setup lang="ts" name="user-ranking">
  // 算力服务排行榜
  import HeaderPage from '../../components/otherHeaderContent.vue';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { getPowerRank, type PowerRank } from '@/api/power.ts';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import paginationContent from '@/components/PaginationContent.vue';

  // defineProps<{ viewportWidth: number }>()
  const size = getScreenSize().currentScreenSize;
  // 表格相关数据及变脸
  const dropdownText = ref('INT8');
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const changeDropdownText = (command: string) => {
    if (command === 'INT8') {
      dropdownText.value = 'INT8';
    }
    if (command === 'FP16') {
      dropdownText.value = 'FP16';
    }
    if (command === 'FP32') {
      dropdownText.value = 'FP32';
    }
  };
  let intervalId: number | undefined;

  const poDatas = reactive<PowerRank[]>([{}]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function fetchPowerRank() {
    const res = await getPowerRank();
    // console.log(res.data.data);
    Object.assign(poDatas, res.data.data);
    totalItems.value = poDatas.length;
  }

  onMounted(() => {
    // 每3秒更新数据
    intervalId = window.setInterval(() => {
      void fetchPowerRank();
    }, 3000);

    // 添加滚动监听
    // window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }

    // 移除滚动监听
    // window.removeEventListener('scroll', handleScroll);
  });

  const currentPage = ref(1); // 当前页码
  const pageSize = ref(2); // 每页显示条目数
  const totalItems = ref(poDatas.length); // 总条目数，即您数组的长度
  // 处理页码改变
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

  // 控制按钮显示隐藏的响应式变量
  const showButton = ref(true);

  // 页面滚动事件处理函数
  // function handleScroll() {
  //   // 当页面滚动超过 600px 时显示按钮
  //   // showButton.value = window.scrollY > -1;
  // }
</script>
<template>
  <div class="user_ranking">
    <HeaderPage :viewport-width="size" />
    <div :style="{ height: size === Screen.Large ? '306px' : '206px' }"></div>
    <div class="computing_power_service_content">
      <div class="computing_power_service_header">
        <div class="computing_power_service_title"
          >{{ $t('home.service_rank') }}
        </div>
      </div>
      <div class="computing_power_service_tabs">
        <div class="computing_power_service_tabs_title"
          >{{ $t('home.effect_power') }}
        </div>
        <div class="computing_power_service_tabs_dropdown">
          <div class="computing_power_service_tabs_dropdown_title"
            >{{ $t('home.power_type') }}
          </div>
          <el-dropdown @command="changeDropdownText">
            <div class="dropdown_text">{{ dropdownText }}</div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="INT8">INT8</el-dropdown-item>
                <el-dropdown-item command="FP16">FP16</el-dropdown-item>
                <el-dropdown-item command="FP32">FP32</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div v-if="size === Screen.Large">
        <div class="ecology_table">
          <el-table
            :data="
              poDatas.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize,
              )
            "
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
            <el-table-column
              type="index"
              :label="$t('home.rank')"
              width="55px"
            />
            <el-table-column prop="miner" :label="$t('home.Miner')" />
            <!--        <el-table-column prop="tag" label="标签">-->
            <el-table-column :label="$t('home.Type_of_computing_power')">
              <div>Utility</div>
              <!--          <template #default="">-->
              <!--            <div>-&#45;&#45;</div>-->
              <!--          </template>-->
            </el-table-column>
            <el-table-column :label="$t('home.eff_power_ratio')" width="250px">
              <template #default="scope">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <div>{{ scope.row.effPower }} TFLOPS</div>
                  <div style="margin-left: 10px">
                    <el-progress
                      :stroke-width="15"
                      :text-inside="true"
                      :percentage="scope.row.effPer"
                      color="rgba(62, 223, 207, 1)"
                      style="width: 119px"
                    />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('home.day_block_reward')">
              <template #default="scope">
                <div>{{ scope.row.dayReward }} UNC</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('home.day_compute_efficiency')">
              <template #default="scope">
                <div>{{ scope.row.dayEff }} UNC/TFLOPS</div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('home.day_compute_increment')">
              <template #default="scope">
                <div>{{ scope.row.dayGrowth }} TFLOPS</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-else>
        <div class="ecology_table">
          <div style="padding: 0 0 5px 18px" class="primary-text-14-500"
            >{{ $t('home.rank') }}
          </div>
          <div v-for="(item, index) in poDatas" :key="index">
            <div class="eco-rank-item">
              <!--          <div class="black-text-14">{{ item.rank }}</div>-->
              <div class="primary-text-14-500" style="color: #000">{{
                index + 1
              }}</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">{{ $t('home.Miner') }}</div>
              <div class="black-text-14-500">{{ item.miner }}</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">{{
                $t('home.Type_of_computing_power')
              }}</div>
              <!--          <div class="black-text-14-500">{{ item.tag }}</div>-->
              <div class="black-text-14-500">Utility</div>
            </div>
            <div class="eco-item">
              <div
                :style="{ width: size === Screen.Small ? '110px' : '190px' }"
                class="grey-text-12-300"
                >{{ $t('home.eff_power_ratio') }}</div
              >
              <div class="eco-merge-value">
                <div class="black-text-14-500"
                  >{{ item.effPower }} TFLOPS&nbsp;
                </div>
                <div v-if="item.effPer! > 0" class="second-text-12-500"
                  >{{ item.effPer }}%
                </div>
                <div v-else-if="item.effPer! <= 0" class="minus-text-12-500"
                  >{{ item.effPer }}%
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">{{
                $t('home.day_block_reward')
              }}</div>
              <div class="black-text-14-500">{{ item.dayReward }} UNC</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">{{
                $t('home.day_compute_efficiency')
              }}</div>
              <div class="black-text-14-500">{{ item.dayEff }} UNC/TFLOPS</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">{{
                $t('home.day_compute_increment')
              }}</div>
              <div class="black-text-14-500">{{ item.dayGrowth }} TFLOPS</div>
            </div>
            <!--        最后一条数据去除分隔线-->
            <div v-if="index !== poDatas.length - 1" class="eco-line"></div>
          </div>
        </div>
      </div>
    </div>

    <paginationContent
      :total-items="totalItems"
      :page-size="pageSize"
      :current-page="currentPage"
      :show-button="showButton"
      @page-change="handlePageChange"
    />
  </div>
</template>
<style scoped lang="scss">
  :deep(.el-table__body-wrapper tbody tr:last-of-type td) {
    border: none !important;
  }

  :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
    background-color: rgba(191, 251, 236, 0.3) !important;
  }
  :deep(.el-table__inner-wrapper::before) {
    display: none !important;
    background-color: transparent !important;
  }

  .user_ranking {
    position: relative;
    width: 100%;
    padding-bottom: 52px;
  }
  .computing_power_service_content {
    position: relative;
    z-index: 1;
  }

  @media screen and (min-width: 1024px) {
    .computing_power_service_content {
      // height: 393px;
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0px 4px 15px 0px rgba(92, 255, 243, 0.1),
        0px 4px 8px 0px rgba(0, 0, 0, 0.04);
      margin: 0 32px 16px;
      margin-bottom: 50px;

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

      .computing_power_service_tabs {
        margin: 12px 22px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .computing_power_service_tabs_title {
          color: #000;
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 24px;
          border-radius: 38px;
          border: 0.5px solid #3edfcf;
        }

        .computing_power_service_tabs_dropdown {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          .computing_power_service_tabs_dropdown_title {
            color: #000;
            opacity: 0.5;
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 400;
            padding: 2px 16px;
            margin-right: 6px;
            border-radius: 38px;
            border: 0.5px solid #3edfcf;
          }

          .dropdown_text {
            width: 65px;
            height: 21px;
            line-height: 21px;
            text-align: center;
            color: #191919;
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 600;
            border-radius: 38px;
            background: #3edfcf;
          }
        }
      }

      .ecology_table {
        width: 100%;
        padding: 0 21px;
        box-sizing: border-box;
        padding-bottom: 30px;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .black-text-14-500 {
      font-size: 12px;
    }
    .eco-merge-value {
      display: flex;
      align-items: center;
    }
    .user_ranking {
      position: relative;
      z-index: 1;
      padding-bottom: 0px !important;
    }
    .computing_power_service_content {
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
          font-family: $primary-font-family;
          font-size: 16px;
          font-weight: 500;
        }
      }

      .computing_power_service_tabs {
        margin: 12px 22px 22px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .computing_power_service_tabs_title {
          color: #000;
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 24px;
          border-radius: 38px;
          border: 0.5px solid #3edfcf;
        }

        .computing_power_service_tabs_dropdown {
          display: flex;
          align-items: center;
          justify-content: flex-end;

          .computing_power_service_tabs_dropdown_title {
            color: #000;
            opacity: 0.5;
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 400;
            padding: 2px 16px;
            margin-right: 6px;
            border-radius: 38px;
            border: 0.5px solid #3edfcf;
          }

          .dropdown_text {
            width: 65px;
            height: 21px;
            line-height: 21px;
            text-align: center;
            color: #191919;
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 600;
            border-radius: 38px;
            background: #3edfcf;
          }
        }
      }

      .ecology_table {
        width: 100%;
        padding: 0 0;
        box-sizing: border-box;
      }
    }
  }
</style>
