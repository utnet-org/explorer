<script setup lang="ts">
  import { onMounted, ref, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import Wallet from '../wallet/connect.ts';
  import { ArrowDown } from '@element-plus/icons-vue';
  import { getPrice } from '../api/price.ts';
  import { getScreenSize, Screen } from '../utils/screen-size.ts';
  import i18n from '@/lang';
  // import { useI18n } from 'vue-i18n';

  const props = defineProps<{ viewportWidth: number }>();
  const router = useRouter();
  const scaleViewportWidth = ref(1); //尺寸缩放比例

  if (props.viewportWidth > 834 && props.viewportWidth < 950) {
    scaleViewportWidth.value = props.viewportWidth / 950;
  }
  if (props.viewportWidth > 430 && props.viewportWidth < 834) {
    scaleViewportWidth.value = props.viewportWidth / 834;
  }
  // const { t } = useI18n();
  // const navSelectList = ['首页', '区块链', '合约', '统计', '资源'];
  const selectIndex = ref(0);
  const address = ref(i18n.global.t('home.connect_wallet'));
  const isConnect = ref(false);
  const price = ref('---');
  const amount = ref('0.00');
  const size = getScreenSize().currentScreenSize;
  const langValue = ref('');

  // 使用 watchEffect 来监听语言变化
  watchEffect(() => {
    // 每当语言变化时，重新获取翻译
    address.value = i18n.global.t('home.connect_wallet');
  });

  const changeSelectIndex = (navIndex: number) => {
    selectIndex.value = navIndex;
    if (navIndex == 0) {
      router.push('/');
    }
    if (navIndex == 1) {
      router.push('/blockchain');
    }
    if (navIndex == 2) {
      router.push('/contract');
    }
    if (navIndex == 3) {
      router.push('/statistics');
    }
    if (navIndex == 4) {
      router.push('/resource');
    }
  };

  onMounted(() => {
    getP();
    if (i18n.global.locale == 'en') {
      langValue.value = 'English';
    } else {
      langValue.value = '简体中文';
    }
  });

  async function getP() {
    console.log('start get price');
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
        // console.log(`Address updated to: ${address.value}`);
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

  // 切换语言
  const handleLang = (command: string) => {
    if (command == 'en') {
      langValue.value = 'English';
    } else if (command == 'zh') {
      langValue.value = '简体中文';
    }
    localStorage.setItem('language', command);
    i18n.global.locale = command as 'en' | 'zh';
    document
      .querySelector('html')!
      .setAttribute('language', localStorage.getItem('language') || 'en');
  };
</script>
<template>
  <div class="nav_content">
    <div class="nav_select">
      <div class="nav_select_left">
        <img src="../assets/images/logo.png" alt="" srcset="" />
        <div class="nav_select_left_title">UNCSCAN</div>
        <div v-if="size === Screen.Large" class="select_list">
          <div
            v-for="(navItem, navIndex) in [
              $t('nav.home'),
              $t('nav.block'),
              $t('nav.contract'),
              $t('nav.statistic'),
              $t('nav.resource'),
            ]"
            :key="navIndex"
            class="select_list_item"
            @click="changeSelectIndex(navIndex)"
            :class="selectIndex == navIndex ? 'active' : ''"
            >{{ navItem }}
          </div>
        </div>
      </div>
      <div class="nav_select_right">
        <div class="dropdown">
          <el-dropdown
            popper-class="drop-menu"
            v-if="isConnect"
            trigger="click"
            placement="bottom-end"
            @command="handleCommand"
          >
            <el-button round class="nav_select_right_title">
              {{ address }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item> {{ $t('home.wallet') }}</el-dropdown-item>
                <el-dropdown-item>
                  {{ $t('home.recent_trans') }}</el-dropdown-item
                >
                <el-dropdown-item command="disconnect">
                  {{ $t('home.disconnect_wallet') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- 当没有连接钱包时显示普通按钮 -->
          <el-button
            v-else
            class="nav_select_right_title"
            @click="connectWallet"
          >
            {{ address }}
          </el-button>
        </div>
        <div v-if="size === Screen.Large" class="wallet_address_section">
          <img src="../assets/images/nav_logo.png" alt="" srcset="" />
          <div class="wallet_address">Utility Mainnet</div>
        </div>
        <div v-if="size === Screen.Large" class="language-container">
          <!--          <el-select-->
          <!--            v-model="langValue"-->
          <!--            class="m-2"-->
          <!--            placeholder="Select"-->
          <!--            no-data-text="语言"-->
          <!--          >-->
          <!--            <el-option-->
          <!--              v-for="item in langOptions"-->
          <!--              :key="item.value"-->
          <!--              :label="item.label"-->
          <!--              :value="item.value"-->
          <!--            />-->
          <!--          </el-select>-->
          <el-dropdown
            popper-class="drop-menu"
            trigger="click"
            placement="bottom-start"
            @command="handleLang"
          >
            <span class="el-dropdown-link language_title">
              {{ langValue }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="en"
                  >{{ $t('lang.en') }}
                </el-dropdown-item>
                <el-dropdown-item command="zh"
                  >{{ $t('lang.zh') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!--          <div class="language_title">简体中文</div>-->
          <!--          <img-->
          <!--            class="language_icon"-->
          <!--            src="../assets/images/nav_to_bottom.png"-->
          <!--            alt=""-->
          <!--            srcset=""-->
          <!--          />-->
        </div>
      </div>
    </div>
    <div v-if="size === Screen.Large" class="nav_corner">
      <div class="nav_corner_item">
        <img src="../assets/images/price_icon.png" alt="" />
        <div>UNC {{ $t('home.price') }}:</div>
        <div>${{ price }}</div>
        <div>(+{{ amount }}%)</div>
      </div>
      <div class="nav_corner_item">
        <div class="nav_corner_item_side">
          <img src="@/assets/images/message_icon.png" alt="" />
          <div>{{ $t('home.mockTip') }}</div>
        </div>
      </div>
    </div>
    <div v-else class="nav_corner">
      <div class="nav_corner_item">
        <div class="nav_corner_item_side">
          <img src="@/assets/images/message_icon.png" alt="" />
          <div>{{ $t('home.mockTip') }}</div>
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
        line-height: 29px;
        text-align: center;
        color: #191919;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        //background-color: #3EDFCF;
        background-color: #ade1db;
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

      .language-container {
        display: flex; /* 设置为 flex 容器 */
        align-items: center; /* 垂直居中子元素 */
      }

      .language_title {
        color: #0facb6;
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

  .nav_corner {
    display: flex;
    margin: 7px 32px 18px;

    .nav_corner_item {
      display: flex;
      align-items: center;
      height: 37px;
      flex: 1;
      border-radius: 4px;
      background: #f5f5f5;

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
            color: #0facb6;
            font-family: PingFang SC;
            font-size: 14px;
            font-weight: 400;
          }

          &:last-child {
            color: #03ad00;
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
  }

  :global(.drop-menu .el-dropdown-menu__item) {
    //--el-dropdown-menuItem-hover-fill: rgba(62, 223, 207, 0.1);
    --el-dropdown-menuItem-hover-color: #3edfcf;
  }

  // 取消el-select的边框
  //:deep(.el-input) {
  //  width: 100px;
  //  --el-input-focus-border: #fff;
  //  --el-input-transparent-border: 0 0 0 0px;
  //  --el-input-border-color: #fff;
  //  --el-input-hover-border: 0px !important;
  //  --el-input-hover-border-color: #fff;
  //  --el-input-focus-border-color: #fff;
  //  --el-input-clear-hover-color: #fff;
  //  box-shadow: 0 0 0 0px !important;
  //  --el-input-border: 0px;
  //}
  //:deep(.el-select .el-input__wrapper.is-focus) {
  //  box-shadow: 0 0 0 0px !important;
  //}
  //:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  //  box-shadow: 0 0 0 0px !important;
  //}
  //:deep(.el-select) {
  //  --el-select-border-color-hover: #fff;
  //}
</style>
