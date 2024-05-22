<script setup lang="ts">
  // 芯片列表
  import { onMounted, onUnmounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import paginationContent from '@/components/paginationContent.vue';
  import { getChipList } from '@/api/chip.ts';
  const size = getScreenSize().currentScreenSize;
  // let intervalId: number | undefined;
  onMounted(() => {
    fetchChipList(currentPage.value, pageSize.value);
    // intervalId = window.setInterval(() => {
    //   fetchChipList(currentPage.value, pageSize.value);
    // }, 5000);
  });
  onUnmounted(() => {
    // if (intervalId !== undefined) {
    //   clearInterval(intervalId);
    // }
  });
  // const dropdownText = ref('INT8');
  const tableData = ref([]);
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(20);
  const totalItems = ref(0);

  const fetchChipList = async (page: number, size: number) => {
    const res = await getChipList(page, size);
    totalItems.value = res.data.data.total;
    tableData.value = res.data.data.chip_list;
  };
  // const changeDropdownText = (command: string) => {
  //   if (command === 'INT8') {
  //     dropdownText.value = 'INT8';
  //   }
  //   if (command === 'FP16') {
  //     dropdownText.value = 'FP16';
  //   }
  //   if (command === 'FP32') {
  //     dropdownText.value = 'FP32';
  //   }
  // };

  // 处理页码改变
  const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await fetchChipList(currentPage.value, pageSize.value);
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
        <div class="block_list_header_title">{{ $t('home.chip_list') }}</div>
        <div class="block_list_header_text">共 {{ totalItems }} 条芯片信息</div>
      </div>
      <!--      <div v-if="size === Screen.Large" class="dropdown">-->
      <!--        <div class="dropdown_title">{{ $t('home.power_type') }} </div>-->
      <!--        <el-dropdown @command="changeDropdownText">-->
      <!--          <div class="dropdown_text">{{ dropdownText }}</div>-->
      <!--          <template #dropdown>-->
      <!--            <el-dropdown-menu>-->
      <!--              <el-dropdown-item command="INT8">INT8</el-dropdown-item>-->
      <!--              <el-dropdown-item command="FP16">FP16</el-dropdown-item>-->
      <!--              <el-dropdown-item command="FP32">FP32</el-dropdown-item>-->
      <!--            </el-dropdown-menu>-->
      <!--          </template>-->
      <!--        </el-dropdown>-->
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
        }"
        :highlight-current-row="true"
      >
        <el-table-column
          prop="chip_type"
          :label="$t('blockChain.chip_model')"
        />
        <el-table-column prop="bus_id" label="ID"></el-table-column>
        <el-table-column
          prop="serial_number"
          :label="$t('blockChain.chip_sn_code')"
        ></el-table-column>
        <el-table-column prop="p2key" label="Pri Key2">
          <template #default="{ row }">
            <el-tooltip effect="dark" :content="row.p2key" placement="top">
              <div class="text-ellipsis">{{ row.p2key }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="public_key" label="Pub Key1">
          <template #default="{ row }">
            <el-tooltip effect="dark" :content="row.public_key" placement="top">
              <div class="text-ellipsis">{{ row.public_key }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="computingPowerType"-->
        <!--          :label="$t('blockChain.chip_computing_power_type')"-->
        <!--        ></el-table-column>-->
        <el-table-column
          prop="power"
          :label="$t('blockChain.chip_computing_power_value') + ' (T)'"
        ></el-table-column>
      </el-table>
      <div v-else style="padding-bottom: 20px">
        <div>
          <div v-for="(item, index) in tableData" :key="index">
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300">
                  {{ $t('blockChain.chip_model') }}
                </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.chip_type }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300"> ID </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.bus_id }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div>
                <div class="grey-text-12-300">
                  {{ $t('blockChain.chip_sn_code') }}
                </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.serial_number }}
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div class="grey-text-14-300"> Pri Key1 </div>
              <div class="black-text-14 text-ellipsis" style="width: 200px">
                <el-tooltip effect="dark" :content="item.p2key" placement="top">
                  {{ item.p2key }}
                </el-tooltip>
              </div>
            </div>
            <!--            <div class="eco-item">-->
            <!--              <div>-->
            <!--                <div class="grey-text-14-300"> Pri Key2 </div>-->
            <!--              </div>-->
            <!--              <div>-->
            <!--                <div class="black-text-14">-->
            <!--                  {{ item.priKey2 }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="eco-item">
              <div class="grey-text-14-300"> Pub Key1 </div>
              <div class="black-text-14 text-ellipsis" style="width: 200px">
                <el-tooltip
                  effect="dark"
                  :content="item.public_key"
                  placement="top"
                >
                  {{ item.public_key }}
                </el-tooltip>
              </div>
            </div>
            <!--            <div class="eco-item">-->
            <!--              <div>-->
            <!--                <div class="grey-text-14-300"> Pub Key2 </div>-->
            <!--              </div>-->
            <!--              <div>-->
            <!--                <div class="black-text-14">-->
            <!--                  {{ item.pubKey2 }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--            <div class="eco-item">-->
            <!--              <div>-->
            <!--                <div class="grey-text-14-300">-->
            <!--                  {{ $t('blockChain.chip_computing_power_type') }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              <div>-->
            <!--                <div class="black-text-14">-->
            <!--                  {{ item.computingPowerType }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <div class="eco-item">
              <div>
                <div class="grey-text-14-300">
                  {{ $t('blockChain.chip_computing_power_value') }}
                </div>
              </div>
              <div>
                <div class="black-text-14">
                  {{ item.power }}
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
  :deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
    background-color: rgba(25, 157, 167, 0.1);
    /* 鼠标悬停时的背景颜色 */
    color: #0facb6;
    /* 鼠标悬停时的字体颜色 */
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
        height: 40px;
        border-radius: 8px;
        background: #fff;
        padding-left: 26px;
        box-shadow:
          0px 4px 15px 0px rgba(92, 255, 243, 0.1),
          0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        margin-bottom: 10px;
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

      .dropdown {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 48px;

        .dropdown_title {
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
      }

      .eco-item2 {
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }
  }
</style>
