<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Wallet from '../wallet/connect.ts';
import { ArrowDown } from "@element-plus/icons-vue";
import { getPrice } from "../api/price.ts";
import { getScreenSize, Screen } from '../utils/screen-size.ts';

const props = defineProps<{ viewportWidth: number }>()
const router = useRouter()
const scaleViewportWidth = ref(1) //尺寸缩放比例

if (props.viewportWidth > 834 && props.viewportWidth < 950) {
  scaleViewportWidth.value = props.viewportWidth / 950
}
if (props.viewportWidth > 430 && props.viewportWidth < 834) {
  scaleViewportWidth.value = props.viewportWidth / 834
}
const navSelectList = ['首页', '区块链', '合约', '统计', '资源']
const selectIndex = ref(0)
const address = ref('连接钱包');
const isConnect = ref(false);
const price = ref('---');
const amount = ref('0.00');
// let size =  reactive<Screen>();
const size = getScreenSize().currentScreenSize;

const changeSelectIndex = (navIndex: number) => {
  selectIndex.value = navIndex
  if (navIndex == 0) {
    router.push('/')
  }
  if (navIndex == 1) {
    router.push('/blockchain')
  }
  if (navIndex == 2) {
    router.push('/contract')
  }
  if (navIndex == 3) {
    router.push('/statistics')
  }
  if (navIndex == 4) {
    router.push('/resource')
  }
}

onMounted(() => {
  getP();
  // size = getScreenSize().currentScreenSize.value;
  // Object.assign(size, getScreenSize().currentScreenSize.value);
  // console.log("size.value");
  // console.log(size.value);
})

async function getP() {
  console.log("start get price");
  const response = await getPrice();
  price.value = response.data.data.price;
  amount.value = response.data.data.amount;
}

async function connectWallet() {
  const wallet = new Wallet();
  try {
    const res = await wallet.connectWallet();
    if (res != null) {
      isConnect.value = true;
      address.value = res;
    }
    // 设置账户变更回调函数
    wallet.registerAccountChangeCallback((newAccount: string) => {
      address.value = newAccount;
      // 这里可以更新UI以反映新的地址
      console.log(`Address updated to: ${address.value}`);
    });
  } catch (error) {
    console.error('连接 MetaMask 时发生错误', error);
  }
}

const handleCommand = (command: string) => {
  const wallet = new Wallet();
  if (command === 'disconnect') {
    address.value = wallet.disconnectWallet();
  }
};
const activeName = ref('0');
const showNavSelectType = ref(false);
const changeCollapse = (index: any) => {
  if (index == '1') {
    window.location.href = '/';
  }
}
const collapseList = [
  {
    title: '首页',
    name: '1',
    optionList: []
  },
  {
    title: '区块链',
    name: '2',
    optionList: [
      {
        title: '区块',
        link: '/blockchain',
      },
      {
        title: '消息',
        link: '',
      },
      {
        title: '富豪榜',
        link: '',
      },
      {
        title: '订单',
        link: '',
      },
      {
        title: '内存池',
        link: '',
      },
      {
        title: '合约验证',
        link: '',
      },
    ]
  },
  {
    title: '合约',
    name: '3',
    optionList: [
      {
        title: 'UVM统计',
        link: '/contract',
      },
      {
        title: '已验证合约',
        link: '',
      },
      {
        title: 'FNS LOOK UP',
        link: '',
      },
      {
        title: '生态导览',
        link: '',
      },
      {
        title: '通证',
        link: '',
      },
      {
        title: 'NFTs',
        link: '',
      },
    ]
  },
  {
    title: '统计',
    name: '4',
    optionList: []
  },
  {
    title: '资源',
    name: '5',
    optionList: []
  }
]
const linkNextRoute = (link: string) => {
  showNavSelectType.value = false;
  if (link != '') {
    linkUrl.value = link;
    router.push(link);
  }
}
const linkUrl = ref('/');

</script>
<template>
  <div class="nav_content">
    <div class="nav_select">
      <div class="nav_select_left">
        <img src="../assets/images/logo.png" alt="" srcset="">
        <div class="nav_select_left_title">UNCSCAN</div>
        <div v-if="size === Screen.Large" class="select_list">
          <div v-for="(navItem, navIndex) in navSelectList" :key="navIndex" class="select_list_item"
            @click="changeSelectIndex(navIndex)" :class="selectIndex == navIndex ? 'active' : ''">{{ navItem }}
          </div>
        </div>
      </div>
      <div class="nav_select_right">
        <div class="dropdown">
          <el-dropdown popper-class="drop-menu" v-if="isConnect" trigger="click" placement="bottom-end"
            @command="handleCommand">
            <el-button round class="nav_select_right_title">
              {{ address }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  钱包
                </el-dropdown-item>
                <el-dropdown-item>
                  最近交易
                </el-dropdown-item>
                <el-dropdown-item command="disconnect">
                  断开连接
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 当没有连接钱包时显示普通按钮 -->
          <el-button v-else class="nav_select_right_title" @click="connectWallet">
            {{ address }}
          </el-button>
        </div>
        <div v-if="size === Screen.Large" class="wallet_address_section">
          <img src="../assets/images/nav_logo.png" alt="" srcset="">
          <div class="wallet_address">Utility Mainnet</div>
        </div>
        <div v-if="size === Screen.Large" class="language-container">
          <div class="language_title">简体中文</div>
          <img class="language_icon" src="../assets/images/nav_to_bottom.png" alt="" srcset="">
        </div>
        <div v-else class="phone_select_icon">
          <img src="../assets/images/phone_nav_select_icon.png" alt="" @click="showNavSelectType = !showNavSelectType">
        </div>
      </div>
    </div>
    <div class="demo-collapse" v-if="showNavSelectType && size === Screen.Small">
      <el-collapse v-model="activeName" accordion @change="changeCollapse">
        <el-collapse-item v-for="(item, index) in collapseList" :key="index" :title="item.title" :name="item.name"
          :style="activeName == item.name ? 'background: #f1f9f2;' : ''">
          <div class="collapse_item" :style="linkUrl == citem.link ? 'font-weight: 600;color:#0FACB6;' : ''"
            v-for="(citem, cindex) in item.optionList" :key="cindex" @click="linkNextRoute(citem.link)">{{ citem.title }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div v-if="size === Screen.Large" class="nav_corner">
      <div class="nav_corner_item">
        <img src="../assets/images/price_icon.png" alt="">
        <div>UNC Price:</div>
        <div>${{ price }}</div>
        <div>(+{{ amount }}%)</div>
      </div>
      <div class="nav_corner_item">
        <div class="nav_corner_item_side">
          <img src="@/assets/images/message_icon.png" alt="">
          <div>页面展示均为模拟数据，测试网上线后转换为真实数据。</div>
        </div>
      </div>
    </div>
    <div v-else class="nav_corner">
      <div class="nav_corner_item">
        <div class="nav_corner_item_side">
          <img src="@/assets/images/message_icon.png" alt="">
          <div>页面展示均为模拟数据，测试网上线后转换为真实数据。</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
//大屏样式
@media screen and (min-width: 1024px) {
  .nav_content {
    width: 100%;
    height: 115px;
  }
}

.nav_select {
  display: flex;
  height: 37px;
  padding: 11px 20px 11px 22px;
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
          color: #0FACB6;
        }
      }

      .active {
        color: #0FACB6;
        font-weight: 600;
        border-bottom: 2px solid #0FACB6;
      }
    }
  }

  .nav_select_right {
    display: flex;
    align-items: center;

    .nav_select_right_title {
      line-height: 29px;
      text-align: center;
      color: #191919;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      //background-color: #3EDFCF;
      background-color: #ADE1DB;
      border-radius: 76px;
      margin-right: 10px;
    }

    .wallet_address_section {
      width: 144px;
      height: 29px;
      background-color: #FFF;
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

    .language-container {
      display: flex;
      /* 设置为 flex 容器 */
      align-items: center;
      /* 垂直居中子元素 */
    }

    .language_title {
      color: #0FACB6;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      margin-right: 6px;
    }

    .language_icon {
      width: 12px;
      height: 7.5px;
    }

    .phone_select_icon {
      display: flex;
      align-items: center;

      img {
        width: 29px;
        height: 29px;
      }
    }
  }
}

.nav_corner {
  display: flex;
  margin: 7px 32px 18px;

  .nav_corner_item {
    display: flex;
    align-items: center;
    height: 37px;
    flex: 1;
    border-radius: 4px;
    background: #F5F5F5;

    &:first-child {
      margin-right: 16px;
      padding: 0 12px;
      box-sizing: border-box;
      justify-content: flex-start;

      img {
        width: 18px;
        height: 14px;
      }

      div {
        margin-left: 8px;

        &:nth-child(2) {
          color: #000;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
        }

        &:nth-child(3) {
          color: #0FACB6;
          font-family: PingFang SC;
          font-size: 14px;
          font-weight: 400;
        }

        &:last-child {
          color: #03AD00;
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 300;
        }
      }
    }

    &:last-child {
      justify-content: space-between;

      .nav_corner_item_side {
        display: flex;
        align-items: center;

        img {
          width: 13px;
          height: 15px;
          margin: 0 5px 0 10px;
        }

        div {
          color: #000;
          font-family: PingFang SC;
          font-size: 12px;
          font-weight: 300;
        }
      }

      .nav_corner_item_time {
        color: #000;
        font-family: PingFang SC;
        font-size: 10px;
        font-weight: 300;
        margin-right: 9px;
      }

    }
  }
}

/* 屏幕宽度小于 430px */
@media screen and (min-width: 320px) and (max-width: 1023px) {
  .nav_content {
    width: 100%;
    height: 65px;
  }

  .demo-collapse {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    // background: #ffffff;
    background: #FBFAF6;
    position: absolute;
    top: 65px;
    left: 0;
    z-index: 999;

    .collapse_item {
      color: #191919;
      font-family: PingFang SC;
      font-size: 14px;
      font-weight: 400;
      padding: 8px 10px;
    }
  }

  ::v-deep .el-collapse-item__header {
    font-size: 15px;
    border: none;
    background-color: transparent;
  }

  ::v-deep .el-collapse-item__content {
    padding-bottom: 0px;
    border: none;
    background: #f1f9f2;
    border-top: 0.5px solid #3EDFCF;
  }

  ::v-deep .el-collapse-item__wrap {
    border: none;
    // padding: 10px 0;
  }

  .nav_corner {
    display: flex;
    margin: 20px 0 0 0;

    .nav_corner_item {
      display: flex;
      align-items: center;
      height: 37px;
      flex: 1;
      border-radius: 4px;
      background: transparent;

      //&:first-child {
      //  margin-right: 16px;
      //  padding: 0 12px;
      //  box-sizing: border-box;
      //  justify-content: flex-start;
      //
      //  img {
      //    width: 18px;
      //    height: 14px;
      //  }
      //
      //  div {
      //    margin-left: 8px;
      //
      //    &:nth-child(2) {
      //      color: #000;
      //      font-family: PingFang SC;
      //      font-size: 12px;
      //      font-style: normal;
      //    }
      //
      //    &:nth-child(3) {
      //      color: #0FACB6;
      //      font-family: PingFang SC;
      //      font-size: 14px;
      //      font-weight: 400;
      //    }
      //
      //    &:last-child {
      //      color: #03AD00;
      //      font-family: PingFang SC;
      //      font-size: 12px;
      //      font-weight: 300;
      //    }
      //  }
      //}

      &:last-child {
        justify-content: space-between;

        .nav_corner_item_side {
          display: flex;
          align-items: center;

          img {
            width: 13px;
            height: 15px;
            margin: 0 5px 0 0;
          }

          div {
            color: #000;
            font-family: PingFang SC;
            font-size: 12px;
            font-weight: 300;
          }
        }

        .nav_corner_item_time {
          color: #000;
          font-family: PingFang SC;
          font-size: 10px;
          font-weight: 300;
          margin-right: 9px;
        }

      }
    }
  }

  :global(.drop-menu .el-dropdown-menu__item) {
    --el-dropdown-menuItem-hover-fill: rgba(62, 223, 207, 0.1);
    ;
    --el-dropdown-menuItem-hover-color: #3edfcf;
  }
}
</style>
