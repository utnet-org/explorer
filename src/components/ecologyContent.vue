<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref} from 'vue';
import {getEcoInfo} from "@/api/ecosystem.ts";
import {EcoInfo} from "@/api/ecosystem.ts";

defineProps<{ viewportWidth: number }>()
// 24h, week, month, year 时间相关数据及变量
const ecologyTimeTypeList = ['24小时', '周', '月', '年']
const checkEcologyTimeType = ref('24h')
const changeTimeType = (item: string) => {
  checkEcologyTimeType.value = item
}
//tabs相关数据及变量
const ecologyTabsList = ['DeFi(12)', 'Community', 'Wallet(3)']
const checkEcologyTabs = ref('DeFi(12)')
const changeTabsType = (item: string) => {
  checkEcologyTabs.value = item
}
let intervalId: number | undefined;

let ecoDatas = reactive<EcoInfo[]>([{}]);

async function fetchEcoInfo() {
  const res = await getEcoInfo();
  Object.assign(ecoDatas, res.data.data);
}

onMounted(() => {
  // 每3秒更新数据
  intervalId = window.setInterval(() => {
    fetchEcoInfo();
  }, 3000);
})

onUnmounted(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});
</script>
<template>
  <div class="ecology_content">
    <div class="ecology_header">
      <div class="ecology_title">生态导览</div>
      <div class="ecology_time">
        <el-button size="small" :color="checkEcologyTimeType == timeItem ? '#3EDFCF' : ''"
                   @click="changeTimeType(timeItem)"
                   :style="{ fontWeight: checkEcologyTimeType == timeItem ? '500' : '300', fontSize: '14px', border: '0.5px solid #3EDFCF', borderRadius: '2px' }"
                   v-for="(timeItem, timeIndex) in ecologyTimeTypeList" :key="timeIndex">{{
            timeItem
                                                                                         }}
        </el-button>
      </div>
    </div>
    <div class="ecology_tabs">
      <div v-for="(tabsItem, tabsIndex) in ecologyTabsList" :key="tabsIndex" class="ecology_tabs_item"
           :class="checkEcologyTabs == tabsItem ? 'active' : ''" @click="changeTabsType(tabsItem)">
        {{ tabsItem }}
      </div>
    </div>
    <div class="ecology_table">
      <el-table :data="ecoDatas" table-layout="fixed"
                :header-cell-style="{ textAlign: 'center', color: 'rgba(0,0,0,0.5)', fontSize: '12px', fontWeight: '300', borderBottom: 'none', backgroundColor: '#F9F9F8' }"
                :cell-style="{ color: '#000', height: '36px', fontSize: '14px', fontWeight: '500', textAlign: 'center', borderBottom: '0.5px solid rgba(140, 233, 220,0.5)', backgroundColor: '#F9F9F8' }">
        <el-table-column type="index" label="排名" width="48px" />
        <el-table-column prop="name" label="名称" />
        <el-table-column label="交易次数">
          <template #default="scope">
            <div style="display: flex;align-items: center;justify-content: center;">
              <div>{{ scope.row.trans }}</div>
              <div style="margin-left: 7px">
                <div v-if="scope.row.transPer>0" style="color: #0FACB6;">+{{ scope.row.transPer }}%</div>
                <div v-else-if="scope.row.transPer<=0" style="color: palevioletred;">{{ scope.row.transPer }}%</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="独立地址数">
          <template #default="scope">
            <div style="display: flex;align-items: center;justify-content: center;">
              <div>{{ scope.row.uniAddr }}</div>
              <div style="margin-left: 7px;">
                <div v-if="scope.row.uniAddrPer>0" style="color: #0FACB6;">+{{ scope.row.uniAddrPer }}%</div>
                <div v-else-if="scope.row.uniAddrPer<=0" style="color: palevioletred;">{{ scope.row.uniAddrPer }}%</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="锁定UNC">
          <template #default="scope">
            <div style="display: flex;align-items: center;justify-content: center;">
              <div>${{ scope.row.locked }}M USD</div>
              <div style="margin-left: 7px;">
                <div v-if="scope.row.lockedPer>0" style="color: #0FACB6;">+{{ scope.row.lockedPer }}%</div>
                <div v-else-if="scope.row.lockedPer<=0" style="color: palevioletred;">{{ scope.row.lockedPer }}%</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="TVL">
          <template #default="scope">
            <div style="display: flex;align-items: center;justify-content: center;">
              <div>${{ scope.row.tvl }}M USD</div>
              <div style="margin-left: 7px;">
                <div v-if="scope.row.tvlPer>0" style="color: #0FACB6;">+{{ scope.row.tvlPer }}%</div>
                <div v-else-if="scope.row.tvlPer<=0" style="color: palevioletred;">{{ scope.row.tvlPer }}%</div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="open_more">查看更多</div>
  </div>
</template>
<style scoped lang="scss">
.ecology_content {
  // height: 393px;
  border-radius: 8px;
  background: #F9F9F8;
  box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
  margin: 0 32px 16px;
  
  .ecology_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 22px;
    padding: 19px 0 12px;
    border-bottom: 0.5px solid rgba(140, 233, 220, 0.5);
    
    .ecology_title {
      color: #000;
      font-family: PingFang SC;
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
    border: 0.5px solid #3EDFCF;
    
    .ecology_tabs_item {
      // flex: 1;
      padding: 0 21px;
      text-align: center;
      color: #6a6a69;
      font-family: PingFang SC;
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
</style>