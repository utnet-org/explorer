<script setup lang="ts">
import correct from '@/assets/svgs/zhengque.svg';
import mistake from '@/assets/svgs/cuowu.svg';
import arrow from '@/assets/svgs/arrow.svg';
import rightarrow from '@/assets/svgs/Rightarrow_de.svg';

const status = 'Success';
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title">交易详情</div>
      <div class="card">
        <div class="card_data">
          <div class="card_title">交易Hash</div>
          <div class="content_father">
            <div class="card_content"
              >BNjBCsvfDPJVS1MJv3ZUHbbknc9vPZkRv2fAN6mzgUM4</div
            >
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">状态</div>
          <div class="content_father">
            <div v-if="status !== 'Success'" class="Success">
              <correct /> Success</div
            >
            <div v-else class="Fail"><mistake /> Fail</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">区块高度</div>
          <div class="content_father">
            <div class="card_content">116,375,717</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">时间戳</div>
          <div class="content_father">
            <div class="card_content"
              >2 hours ago (Apr-08-2024 6:47:45 AM +UTC)</div
            >
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">发送方</div>
          <div class="content_father">
            <div class="card_content">relay.tg</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">接收方</div>
          <div class="content_father">
            <div class="card_content"
              >BNjBCsvfDPJVS1MJv3ZUHbbknc9vPZkRv2fAN6mzgUM4</div
            >
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">Tokens Transferred</div>
          <div class="cont_arr">
            <div class="card_content">
              <rightarrow />
              From system To i7102151627.tg For 0.030075 HOTHOT ( HOT)</div
            >
            <div class="card_content">
              <rightarrow />From system To i7169098064.tg For 0.006015 HOTHOT (
              HOT)</div
            >
            <div class="card_content">
              <rightarrow />From system To i7107508198.tg For 0.001503 HOTHOT (
              HOT)</div
            >
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">存款价值</div>
          <div class="content_father">
            <div class="card_content">0 Ⓝ ($0.000000)</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">交易费</div>
          <div class="content_father">
            <div class="card_content">0.00098 Ⓝ ($0.007302)</div>
          </div>
        </div>

        <el-collapse :border="false">
          <el-collapse-item title="点击查看更多" name="">
            <div class="collapse_father">
              <div class="collapse_title">Txn的Gas限制和使用情况</div>
              <div class="collapse_data">0.00 gas | 10.21 Tgas ( N/A )</div>
            </div>
            <div class="collapse_father">
              <div class="collapse_title">Burnt Gas & Tokens by Txn</div>
              <div class="collapse_data" ><span class="span_bg">🔥 2.63 Tgas | 0.00026 Ⓝ</span></div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<!-- 14, 57, 57 -->
<style scoped lang="scss">
.collapse_father{

  display: flex;
  margin: 10px 0;
  
}
.span_bg{
  background: rgba(255, 189, 71, 0.26);
  border-radius: 4px;
  padding: 2px 8px;
}
.el-collapse {
  padding-left: 16px;
  background: #f9f9f8;
}
.collapse_title{
  flex: 1;
}
.collapse_data{
  flex: 3;
}
::v-deep(.el-collapse-item__header) {
  background: #f9f9f8;
  color: #3edfcf;
  font-size: 14px;
  // border: none !important;

  border: none;
  background-color: transparent;

  width: 110px;
}
::v-deep(.el-collapse-item__wrap) {
  background: #f9f9f8;
}
::v-deep(.el-collapse-item__content) {
 padding-bottom: 10px;
}

:global(button:focus, button:focus-visible) {
  outline: none;
}

* {
  box-sizing: border-box;
}

.details {
  padding: 0 72px;
  margin-bottom: 50px;
}

.details_title {
  height: 68px;
  font-size: 20px;
  color: #333333;
  display: flex;
  align-items: center;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 0;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f9f9f8;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04),
    0px 4px 15px 0px rgba(92, 255, 243, 0.1);
}

.card_data {
  border-bottom: 1px solid #e9ecef;
  color: rgb(59, 67, 80);
  display: flex;
  font-size: 14px;

  // height: 52px;
  align-items: center;
  padding: 16px;
}

.card_title {
  flex: 1;
}

.content_father {
  flex: 3;
  display: flex;
}
.Success {
  width: 86px;
  height: 25px;
  background-color: rgba(0, 255, 229, 0.153);
  color: #3edfcf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 6px;
}

.Fail {
  width: 86px;
  height: 25px;
  background-color: rgba(255, 0, 0, 0.1);
  color: #ff0000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 6px;
}
.card_content {
}

.content_button {
  width: 60px;
  height: 25px;
  border-radius: 20px;
  background-color: #3edfcf;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-right: 14px;
}
.more {
  color: #3edfcf;
  font-size: 14px;
  padding: 16px;
  display: flex;
  align-items: center;
}
.cont_arr {
  display: flex;
  flex-direction: column;
  flex: 3;
  gap: 10px;
}

@media (max-width: 1023px) {
  .details {
    padding: 0 42px;
    margin-top: 50px;
  }
}

@media (max-width: 843px) {
  .details {
    padding: 0 42px;
  }

  .card_data {
    flex-direction: column;
    align-items: start;
  }

  .card_title {
    margin-bottom: 10px;
  }

  .card_content {
    //换行

    overflow-wrap: break-word;
    white-space: wrap;

    word-wrap: break-word;
  }
}

@media (max-width: 520px) {
  .card_content {
    max-width: 280px;
  }

  .details {
    padding: 0px 22px;
  }
}
</style>