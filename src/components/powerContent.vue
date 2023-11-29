<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref} from 'vue';
import {getPowerRank, PowerRank} from "@/api/power.ts";
import {getScreenSize, Screen} from "@/utils/screen-size.ts";

// defineProps<{ viewportWidth: number }>()
const size = getScreenSize().currentScreenSize;
//表格相关数据及变脸
const dropdownText = ref('INT8')
const changeDropdownText = (command: string) => {
  if (command === 'INT8') {
    dropdownText.value = 'INT8'
  }
  if (command === 'FP16') {
    dropdownText.value = 'FP16'
  }
  if (command === 'FP32') {
    dropdownText.value = 'FP32'
  }
}
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
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});

</script>
<template>
  <div class="computing_power_service_content">
    <div class="computing_power_service_header">
      <div class="computing_power_service_title">算力服务排行榜</div>
    </div>
    <div class="computing_power_service_tabs">
      <div class="computing_power_service_tabs_title">有效算力</div>
      <div class="computing_power_service_tabs_dropdown">
        <div class="computing_power_service_tabs_dropdown_title">算力类型</div>
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
        <el-table :data="poDatas" table-layout="fixed"
                  :header-cell-style="{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: '300', borderBottom: 'none', backgroundColor: '#F9F9F8' }"
                  :cell-style="{ color: '#000', height: '36px', fontSize: '14px', fontWeight: '500', textAlign: 'center', borderBottom: '0.5px solid rgba(140, 233, 220,0.5)', backgroundColor: '#F9F9F8' }">
          <el-table-column type="index" label="排名" width="48px" />
          <el-table-column prop="miner" label="算力提供者" />
          <!--        <el-table-column prop="tag" label="标签">-->
          <el-table-column label="标签">
            <div>Utility</div>
            <!--          <template #default="">-->
            <!--            <div>-&#45;&#45;</div>-->
            <!--          </template>-->
          </el-table-column>
          <el-table-column label="有效算力 / 占比" width="250px">
            <template #default="scope">
              <div style="display: flex;align-items: center;justify-content: center;">
                <div>{{ scope.row.effPower }} TFLOPS</div>
                <div style="margin-left: 10px;">
                  <el-progress :stroke-width="15" :text-inside="true" :percentage="scope.row.effPer"
                               color="rgba(62, 223, 207, 1)" style="width: 119px;" />
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="24小时出块奖励">
            <template #default="scope">
              <div>{{ scope.row.dayReward }} UNC</div>
            </template>
          </el-table-column>
          <el-table-column label="24小时算力效率">
            <template #default="scope">
              <div>{{ scope.row.dayEff }} UNC/TFLOPS</div>
            </template>
          </el-table-column>
          <el-table-column label="24小时算力增量">
            <template #default="scope">
              <div>{{ scope.row.dayGrowth }} TFLOPS</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-else>
      <div class="ecology_table">
        <div v-for="(item, index) in poDatas" :key="index">
          <div class="eco-item">
            <div class="grey-text-12-300">排名</div>
            <!--          <div class="black-text-14">{{ item.rank }}</div>-->
            <div class="black-text-14-500">{{ index + 1 }}</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">名称</div>
            <div class="black-text-14-500">{{ item.miner }}</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">标签</div>
            <!--          <div class="black-text-14-500">{{ item.tag }}</div>-->
            <div class="black-text-14-500">Utility</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">有效算力 / 占比</div>
            <div class="eco-merge-value">
              <div v-if="item.effPer! > 0" class="second-text-12-500">+{{ item.effPer }}%</div>
              <div v-else-if="item.effPer! <= 0" class="minus-text-12-500">{{ item.effPer }}%</div>
              <div class="black-text-14-500">&nbsp;{{ item.effPower }} TFLOPS</div>
            </div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">24小时出块奖励</div>
            <div class="black-text-14-500">{{ item.dayReward }} UNC</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">24小时算力效率</div>
            <div class="black-text-14-500">{{ item.dayEff }} UNC/TFLOPS</div>
          </div>
          <div class="eco-item">
            <div class="grey-text-12-300">24小时算力增量</div>
            <div class="black-text-14-500">{{ item.dayGrowth }} TFLOPS</div>
          </div>
          <!--        最后一条数据去除分隔线-->
          <div v-if="index !== poDatas.length-1" class="eco-line"></div>
        </div>
      </div>
    </div>
    <div class="open_more">查看更多</div>
  </div>
</template>
<style scoped lang="scss">
@media screen and (min-width: 1024px) {
  .computing_power_service_content {
    // height: 393px;
    border-radius: 8px;
    background: #F9F9F8;
    box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
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
        border: 0.5px solid #3EDFCF;
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
          border: 0.5px solid #3EDFCF;
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
          background: #3EDFCF;
        }
      }
    }
    
    .ecology_table {
      width: 100%;
      padding: 0 21px;
      box-sizing: border-box;
    }
    
    .open_more {
      margin-top: 12px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #000;
      font-size: 14px;
      cursor: pointer;
      font-weight: 400;
      border-radius: 0px 0px 8px 8px;
      background: rgba(255, 255, 255, 0.80);
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 1023px) {
  .computing_power_service_content {
    border-radius: 8px;
    background: #F9F9F8;
    box-shadow: 0 4px 15px 0 rgba(92, 255, 243, 0.10), 0 4px 8px 0 rgba(0, 0, 0, 0.04);
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
        border: 0.5px solid #3EDFCF;
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
          border: 0.5px solid #3EDFCF;
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
          background: #3EDFCF;
        }
      }
    }
    
    .ecology_table {
      width: 100%;
      padding: 0 0;
      box-sizing: border-box;
    }
    
    .open_more {
      margin-top: 12px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #000;
      font-size: 14px;
      cursor: pointer;
      font-weight: 400;
      border-radius: 0 0 8px 8px;
      background: rgba(255, 255, 255, 0.80);
    }
    
    .eco-item {
      display: flex;
      justify-content: space-between;
      padding: 2px 18px;
    }
    
    .eco-line {
      height: 0.5px;
      background: $primary-color;
      opacity: 0.5;
      margin: 12px 18px;
    }
    
    .eco-merge-value {
      display: flex;
      align-items: center;
    }
  }
}
</style>