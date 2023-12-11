<script setup lang="ts">
  // uvm统计
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
  const navSelectList = [
    {
      title: 'nav.block_chain',
      name: '2',
      selectList: [
        {
          title: 'blockChain.block',
          link: '/blockchain',
        },
        {
          title: 'blockChain.block_information',
          link: '/blockchain/message',
        },
        {
          title: 'blockChain.block_rich_list',
          link: '/blockchain/richlist',
        },
        {
          title: 'blockChain.block_order',
          link: '/blockchain/order',
        },
        {
          title: 'blockChain.block_memory_pool',
          link: '/blockchain/memoryPool',
        },
        {
          title: 'blockChain.block_contract_verification',
          link: '/blockchain/contractVerification',
        },
      ],
    },
    {
      title: 'nav.contract',
      name: '3',
      selectList: [
        {
          title: 'contract.contract_UVM_statistics',
          link: '/contract/uvm',
        },
        {
          title: 'contract.contract_verified_contract',
          link: '',
        },
        {
          title: 'FNS LOOK UP',
          link: '',
        },
        {
          title: 'contract.contract_ecological_tour',
          link: '',
        },
        {
          title: 'contract.contract_pass',
          link: '',
        },
        {
          title: 'NFTs',
          link: '',
        },
      ],
    },
    {
      title: 'nav.statistic',
      name: '4',
      selectList: [
        {
          title: 'static.static_computing_power_service_chart',
          link: '/statistics',
        },
        {
          title: 'static.static_gas_ranking',
          link: '',
        },
        {
          title: 'static.static_computing_power_service_rankings',
          link: '/statistics/ranking',
        },
      ],
    },
    {
      title: 'nav.resource',
      name: '5',
      selectList: [
        {
          title: 'source.source_common_tool',
          link: '/resource/commontool',
        },
        {
          title: 'source.source_knowledge_base',
          link: '/resource/knowledgeBase',
        },
      ],
    },
  ];
  const languageList = ['en', 'zh'];
  const selectIndex = ref(-1);
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

  const changeSelectIndex = () => {
    activeName.value = '0';
    linkUrl.value = '/';
    selectIndex.value = -1;
    showNavSelectType.value = false;
    router.push('/');
  };

  onMounted(() => {
    getP();
    if (i18n.global.locale == 'en') {
      langValue.value = 'English';
    } else {
      langValue.value = '简体中文';
    }
    navSelectList.forEach((item, index) => {
      item.selectList.forEach(citem => {
        if (citem.link === router.currentRoute.value.path) {
          selectIndex.value = index;
          linkUrl.value = citem.link;
        }
      });
    });
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
        //console.log(`Address updated to: ${address.value}`);
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
  };
  const linkNextRoute = (link: string, navIndex: number) => {
    selectIndex.value = navIndex;
    showNavSelectType.value = false;
    if (link != '') {
      linkUrl.value = link;
      router.push(link);
    }
  };
  const linkUrl = ref('/');

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
            class="select_list_item"
            :class="selectIndex == -1 ? 'active' : ''"
            @click="changeSelectIndex"
            >{{ $t('nav.home') }}</div
          >
          <div v-for="(navItem, navIndex) in navSelectList" :key="navIndex">
            <el-dropdown
              popper-class="drop-menu"
              trigger="click"
              placement="bottom-start"
            >
              <div
                class="select_list_item"
                :class="selectIndex == navIndex ? 'active' : ''"
              >
                {{ $t(navItem.title) }}
              </div>
              <template #dropdown v-if="navItem.selectList.length">
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(navCitem, navCindex) in navItem.selectList"
                    :key="navCindex"
                    @click="linkNextRoute(navCitem.link, navIndex)"
                  >
                    {{ $t(navCitem.title) }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          <!-- class="language_icon"-->
          <!-- src="../assets/images/nav_to_bottom.png"-->
          <!-- alt=""-->
          <!-- srcset=""-->
          <!--          />-->
        </div>
        <div v-else class="phone_select_icon">
          <img
            src="../assets/images/phone_nav_select_icon.png"
            alt=""
            @click="showNavSelectType = !showNavSelectType"
          />
        </div>
      </div>
    </div>
    <div
      class="demo-collapse"
      v-if="showNavSelectType && size === Screen.Small"
    >
      <div class="first_collapse_item" @click="changeSelectIndex">首页</div>
      <el-collapse v-model="activeName" accordion @change="changeCollapse">
        <el-collapse-item
          v-for="(item, index) in navSelectList"
          :key="index"
          :title="$t(item.title)"
          :name="item.name"
          :style="activeName == item.name ? 'background: #f1f9f2;' : ''"
        >
          <div
            class="collapse_item"
            :style="
              linkUrl === citem.link ? 'font-weight: 600;color:#0FACB6;' : ''
            "
            v-for="(citem, cindex) in item.selectList"
            :key="cindex"
            @click="linkNextRoute(citem.link, index)"
            >{{ $t(citem.title) }}
          </div>
        </el-collapse-item>
        <el-collapse-item
          :title="$t('nav.language')"
          name="6"
          :style="activeName == '6' ? 'background: #f1f9f2;' : ''"
        >
          <div
            class="collapse_item"
            v-for="(citem, cindex) in languageList"
            :key="cindex"
            @click="handleLang(citem)"
            >{{ $t('lang.' + citem) }}
          </div>
        </el-collapse-item>
      </el-collapse>
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
        display: flex;
        /* 设置为 flex 容器 */
        align-items: center;
        /* 垂直居中子元素 */
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

    .demo-collapse {
      width: 100%;
      padding: 0 20px 10px;
      box-sizing: border-box;
      // background: #ffffff;
      background: #fbfaf6;
      position: absolute;
      top: 65px;
      left: 0;
      z-index: 999;

      .first_collapse_item {
        color: #191919;
        font-family: PingFang SC;
        font-size: 15px;
        font-weight: 400;
        height: 48px;
        line-height: 48px;
      }

      .collapse_item {
        color: #191919;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        padding: 8px 10px;
      }
    }

    :deep(.el-collapse-item__header) {
      color: #191919;
      font-family: PingFang SC;
      font-size: 15px;
      font-weight: 400;
      border: none;
      background-color: transparent;
    }

    :deep(.el-collapse-item__content) {
      padding-bottom: 0px;
      border: none;
      background: #f1f9f2;
      border-top: 0.5px solid #3edfcf;
    }

    :deep(.el-collapse-item__wrap) {
      border: none;
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

    :global(.el-collapse .drop-menu .el-dropdown-menu__item) {
      --el-dropdown-menuItem-hover-fill: rgba(62, 223, 207, 0.1);
      --el-dropdown-menuItem-hover-color: #3edfcf;
      --el-collapse-border-color: none;
    }

    :global(button:focus, button:focus-visible) {
      outline: none;
    }
  }
</style>
