<script setup lang="ts">
import { ref } from "vue";
defineProps<{ viewportWidth: number }>();
const navSelectList = ["首页", "区块链", "合约", "统计", "资源"];
const selectIndex = ref(0);
const chanegSelectIndex = (navIndex: number) => {
  selectIndex.value = navIndex;
};
</script>
<template>
  <div class="nav_content1440" v-if="viewportWidth > 834">
    <div class="nav_select">
      <div class="nav_select_left">
        <img src="../assets/images/logo.png" alt="" srcset="" />
        <div class="nav_select_left_title">Utilityscan</div>
        <div class="select_list">
          <div
            v-for="(navItem, navIndex) in navSelectList"
            :key="navIndex"
            class="select_list_item"
            @click="chanegSelectIndex(navIndex)"
            :class="selectIndex == navIndex ? 'active' : ''"
          >
            {{ navItem }}
          </div>
        </div>
      </div>
      <div class="nav_select_right">
        <div class="nav_select_right_title">Connect Wallet</div>
        <div class="wallet_address_section">
          <img src="../assets/images/nav_logo.png" alt="" srcset="" />
          <div class="wallet_address">Utility Mainnet</div>
        </div>
        <div class="language_title">EN</div>
        <img
          class="language_icon"
          src="../assets/images/nav_to_bottom.png"
          alt=""
          srcset=""
        />
      </div>
    </div>
    <div class=""></div>
  </div>
  <div
    class="nav_content834"
    v-if="viewportWidth > 430 && viewportWidth <= 834"
  >
    <div></div>
  </div>
  <div class="nav_content430" v-if="viewportWidth <= 430">
    <div></div>
  </div>
</template>
<style scoped lang="scss">
//大屏样式
.nav_content1440 {
  width: 100%;
  height: 115px;

  .nav_select {
    display: flex;
    height: 37px;
    padding: 11px 32px;
    justify-content: space-between;

    .nav_select_left {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 37px;
      }

      .nav_select_left_title {
        margin: 0 15px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #191919;
      }

      .select_list {
        display: flex;
        align-items: center;

        .select_list_item {
          box-sizing: border-box;
          width: 74px;
          height: 37px;
          line-height: 37px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #191919;
          text-align: center;
          // border-bottom: 2px solid transparent;

          &:hover {
            cursor: pointer;
            color: #0facb6;
          }
        }

        .active {
          color: #0facb6;
          font-weight: 600;
          border-bottom: 2px solid #0facb6;
        }
      }
    }

    .nav_select_right {
      display: flex;
      align-items: center;

      .nav_select_right_title {
        width: 126px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        color: #191919;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        background-color: #3edfcf;
        border-radius: 76px;
        margin-right: 10px;
      }

      .wallet_address_section {
        width: 144px;
        height: 29px;
        background-color: #fff;
        border-radius: 77px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #191919;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        margin-right: 12px;

        img {
          width: 20px;
          height: 24px;
          margin-right: 9px;
        }
      }

      .language_title {
        color: #0facb6;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        margin-right: 6px;
      }

      .language_icon {
        width: 12px;
        height: 7.5px;
      }
    }
  }

  // div {
  //     width: 100px;
  //     height: 115px;
  //     background-color: red;
  // }
}

//中屏样式
.nav_content834 {
  width: 100vw;
  height: 125px;
  background-color: red;
}

//小屏样式
.nav_content430 {
  width: 100vw;
  height: 59px;
  background-color: red;
}
</style>
