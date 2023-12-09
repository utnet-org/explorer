<script setup lang="ts">
import { ref } from 'vue';
import HeaderPage from '../../components/headerContent.vue';
// defineProps<{ msg: string }>()
// const count = ref(0)
import { onMounted } from 'vue';
const windowWidth = ref(document.documentElement.clientWidth);
//监听窗口大小变化
onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = document.documentElement.clientWidth;
    console.log(windowWidth.value);
  });
});
const tableData = [
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '+8.34%',
    name: 'MineFi',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
<template>
  <div class="content">
    <!-- 头部 -->
    <HeaderPage fromPage="contract" />
    <div style="height: 60px"></div>
    <div class="peak_content_section">
      <div class="peak_content_section_header">UVM概览</div>
      <div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item first_item">
            <div>区块高度</div>
            <div>3,290,404</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item secound_item">
            <div>最新区块时间</div>
            <div>1分15秒前</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>全网有效算力</div>
            <div>24.427 TFLOPS</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>活跃算力提供者</div>
            <div>3366</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>每区块奖励</div>
            <div>11.1898 UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_under">
          <div class="peak_content_section_item first_item">
            <div>区块高度</div>
            <div>3,290,404</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item secound_item">
            <div>区块高度</div>
            <div>3,290,404</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>区块高度</div>
            <div>3,290,404</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>区块高度</div>
            <div>3,290,404</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>区块高度</div>
            <div>3,290,404</div>
          </div>
        </div>
      </div>
    </div>
    <div class="block_list">
      <div class="block_list_header">热门合约</div>
      <div style="padding: 0 31px; margin-top: 22px">
        <el-table :data="tableData" table-layout="fixed" :header-cell-style="{
          textAlign: 'center',
          color: 'rgba(0,0,0,0.5)',
          fontSize: '12px',
          fontWeight: '300',
          borderBottom: 'none',
          backgroundColor: '#F9F9F8',
        }" :cell-style="{
  color: '#000',
  height: '52px',
  fontSize: '14px',
  fontWeight: '500',
  textAlign: 'center',
  borderBottom: '0.5px solid rgba(140, 233, 220,0.5)',
  backgroundColor: '#F9F9F8',
}">
          <el-table-column prop="name" label="合约地址">
            <template #default="">
              <div style="color: #6a6a69; font-size: 14px">f410fuulql35m2...56fbezvq5osbvq</div>
            </template>
          </el-table-column>
          <el-table-column label="合约名称">
            <template #default="">
              <div style="color: #6a6a69; font-size: 14px">验证并发布</div>
            </template>
          </el-table-column>
          <el-table-column label="交易数量">
            <template #default="">
              <div style="color: #6a6a69; font-size: 14px">89</div>
            </template>
          </el-table-column>
          <el-table-column label="独立用户数">
            <template #default="">
              <div style="color: #6a6a69; font-size: 14px">79</div>
            </template>
          </el-table-column>
          <el-table-column label="余额">
            <template #default="">
              <div style="color: #6a6a69; font-size: 14px">0 UNC</div>
            </template>
          </el-table-column>
          <el-table-column label="Gas费用">
            <template #default="">
              <div style="color: #6a6a69; font-size: 14px">0.01 UNC</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.content {
  width: 100%;
  min-height: 100vh;
  background: #f2f0ea;
  position: relative;

  .peak_content_section {
    margin: 0 63px 43px;
    // padding: 0 36px;
    box-sizing: border-box;
    height: 240px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0px 4px 15px 0px rgba(92, 255, 243, 0.1),
      0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    position: relative;
    z-index: 10;

    .peak_content_section_header {
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
    }

    .peak_content_section_item {
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      div {
        &:first-child {
          color: rgba(99, 96, 96, 0.5);
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 4px;
        }

        &:last-child {
          color: #000;
          font-family: PingFang SC;
          font-size: 16px;
          font-weight: 500;
        }
      }

      &:hover {
        background: radial-gradient(47.32% 47.32% at 50% 50%,
            #c5fcff 0%,
            rgba(245, 245, 245, 0) 100%);
      }
    }

    .peak_content_section_item_side {
      width: 1px;
      height: 46px;
      background-color: rgba(190, 210, 217, 1);
    }

    .first_item {
      width: 278px;
    }

    .secound_item {
      width: 240px;
    }

    .third_item {
      width: 301px;
    }

    .fourth_item {
      width: 280px;
    }

    .fifth_item {
      width: 205px;
    }

    .peak_content_section_above {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .peak_content_section_line {
      width: 100%;
      height: 0.5px;
      background: #bed2d9;
    }

    .peak_content_section_under {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .block_list {
    width: calc(100% - 124px);
    // height: 500px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0px 4px 15px 0px rgba(92, 255, 243, 0.1),
      0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    position: relative;
    z-index: 10;
    margin-left: 62px;

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
    }
  }
}
</style>
