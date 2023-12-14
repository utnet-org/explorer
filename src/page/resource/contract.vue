<script setup lang="ts">
  // 最新区块
  import { onMounted } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  // const windowWidth = ref(document.documentElement.clientWidth);

  //监听窗口大小变化
  onMounted(() => {});

  const officialCommunityList = [
    {
      title: 'footer.official_community',
      link: 'https://wiki.utlab.io/zh-cn/blog',
    },
    {
      title: 'footer.gitHub_browser_repository',
      link: 'https://github.com/utnet-org/explorer',
    },
    {
      title: 'footer.official_x_address',
      link: 'https://x.com/UtilityNet_',
    },
    {
      title: 'home.community',
      link: 'https://wiki.utlab.io/zh-cn/blog',
    },
  ];
  const mostUsedLinkList = [
    {
      title: 'home.website',
      link: 'https://utlab.io',
    },
    {
      title: 'footer.github_organization_homepage',
      link: 'https://github.com/utnet-org',
    },
    {
      title: 'home.dev_guide',
      link: 'https://utlab.io/developers/docs',
    },
    {
      title: 'footer.learning_centre',
      link: 'https://utlab.io/learning/learning_center',
    },
    {
      title: 'Wiki',
      link: 'https://wiki.utlab.io/',
    },
    {
      title: 'home.white_book',
      link: 'http://oss2.xuanwoo.com/UtilityNetWhitePaper.pdf',
    },
    {
      title: 'home.faucet',
      link: 'https://faucet.utlab.io/',
    },
  ];
  const developmentToolsList = [
    {
      title: 'footer.dapp_tools',
      link: 'https://wiki.utlab.io/docs/dapp/start',
    },
  ];
  const linkToRoute = (url: string) => {
    if (url == '') return;
    window.open(url);
  };
</script>
<template>
  <div class="content">
    <!-- 头部 -->
    <HeaderPage />
    <div style="height: 200px"></div>
    <div class="block_list">
      <div class="block_list_header">{{ $t('footer.official_community') }}</div>
      <div class="block_list_options">
        <div
          class="block_list_options_item"
          v-for="(item, index) in officialCommunityList"
          :key="index"
          @click="linkToRoute(item.link)"
          >{{ $t(item.title) }}
        </div>
      </div>
    </div>
    <div class="block_list most_used_link">
      <div class="block_list_header">{{ $t('footer.most_used_links') }}</div>
      <div class="block_list_options">
        <div
          class="block_list_options_item"
          v-for="(item, index) in mostUsedLinkList"
          :key="index"
          @click="linkToRoute(item.link)"
          >{{ $t(item.title) }}</div
        >
      </div>
    </div>
    <div class="block_list development_tools">
      <div class="block_list_header">{{ $t('footer.development_tools') }}</div>
      <div class="block_list_options">
        <div
          class="block_list_options_item"
          v-for="(item, index) in developmentToolsList"
          :key="index"
          @click="linkToRoute(item.link)"
          >{{ $t(item.title) }}</div
        >
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

    .block_list {
      width: calc(100% - 64px);
      border-radius: 8px;
      background: #f9f9f8;
      box-shadow:
        0px 4px 15px 0px rgba(92, 255, 243, 0.1),
        0px 4px 8px 0px rgba(0, 0, 0, 0.04);
      position: relative;
      z-index: 10;
      // margin-left: 62px;
      margin: 39px auto 36px;

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
        margin-bottom: 10px;
      }

      .block_list_options {
        min-height: 147px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        color: #000;
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: 400;

        .block_list_options_item {
          width: 25%;
          box-sizing: border-box;
          height: 52px;
          line-height: 52px;
          text-align: center;
          margin: 20px 0;
          border-right: 0.5px solid #c1d3da;
          cursor: pointer;

          &:hover {
            color: #0facb6;
          }

          &:nth-child(4n) {
            border-right: none;
          }

          &:last-child {
            border-right: none;
          }
        }
      }
    }

    .most_used_link {
      margin-top: 53px;
    }

    .development_tools {
      margin-top: 53px;
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

        .block_list_options {
          min-height: max-content;
          font-size: 14px;

          .block_list_options_item {
            width: calc(100% / 2);

            &:nth-child(2n) {
              border-right: none;
            }
          }
        }
      }
    }
  }
</style>
