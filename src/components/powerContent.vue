<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { getPowerRank, PowerRank } from '@/api/power.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  // defineProps<{ viewportWidth: number }>()
  const size = getScreenSize().currentScreenSize;
  //表格相关数据及变脸
  const dropdownText = ref('INT8');
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

  let poDatas = reactive<PowerRank[]>([{}]);

  async function fetchPowerRank() {
    const res = await getPowerRank();
    // console.log(res.data.data);
    Object.assign(poDatas, res.data.data);
  }

  onMounted(() => {
    // 每3秒更新数据
    intervalId = window.setInterval(() => {
      fetchPowerRank();
    }, 3000);
  });

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  });
  const goToMore = () => {
    localStorage.setItem('navSelectIndex', '2');
    window.location.reload();
    window.location.href = '/statistics/ranking';
  };
</script>
<template>
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
          <div class="dropdown_text"
            >{{ dropdownText
            }}<el-icon class="el-icon--right"> <arrow-down /> </el-icon
          ></div>
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
          :data="poDatas"
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
            // backgroundColor: '#F9F9F8',
          }"
          :highlight-current-row="true"
        >
          <el-table-column type="index" :label="$t('home.rank')" width="55px" />
          <el-table-column prop="miner" :label="$t('home.miner')" />
          <!--        <el-table-column prop="tag" label="标签">-->
          <el-table-column :label="$t('home.tag')">
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
            <div class="primary-text-14-500">{{ index + 1 }}</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">{{ $t('home.miner') }}</div>
            <div class="black-text-14-500">{{ item.miner }}</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">{{ $t('home.tag') }}</div>
            <!--          <div class="black-text-14-500">{{ item.tag }}</div>-->
            <div class="black-text-14-500">Utility</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">{{ $t('home.eff_power_ratio') }}</div>
            <div class="eco-merge-value">
              <div v-if="item.effPer! > 0" class="second-text-12-500"
                >+{{ item.effPer }}%
              </div>
              <div v-else-if="item.effPer! <= 0" class="minus-text-12-500"
                >{{ item.effPer }}%
              </div>
              <div class="black-text-14-500"
                >&nbsp;{{ item.effPower }} TFLOPS
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
    <div class="open_more" @click="goToMore">{{ $t('home.see_more') }}</div>
  </div>
</template>
<style scoped lang="scss">
  :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    background-color: rgba(25, 157, 167, 0.1);
    /* 鼠标悬停时的背景颜色 */
    color: #0facb6;
    /* 鼠标悬停时的字体颜色 */
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
        // padding: 0 21px;
        box-sizing: border-box;
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 1023px) {
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
