<script setup lang="ts">
  // 最新区块
  import { onMounted, ref } from 'vue';
  import HeaderPage from '../../components/otherHeaderContent.vue';
  // const windowWidth = ref(document.documentElement.clientWidth);

  // 监听窗口大小变化
  onMounted(() => {});
  const articleList = [
    {
      id: '',
      title: 'contract.Getting_Started',
    },
    {
      id: '',
      title: 'contract.Mining',
    },
    {
      id: '',
      title: 'contract.Development',
    },
  ];
  const currentIndex = ref(0);
  const changeContent = (index: number) => {
    currentIndex.value = index;
  };
</script>
<template>
  <div class="content">
    <!-- 头部 -->
    <HeaderPage />
    <div style="height: 200px"></div>
    <div class="block_list">
      <div class="block_list_side">
        <div class="block_list_side_header">{{
          $t('contract.Article_list')
        }}</div>
        <div class="block_list_side_list">
          <div
            v-for="(item, index) in articleList"
            :key="index"
            class="block_list_side_list_item"
            @click="changeContent(index)"
            >{{ index + 1 }}.{{ $t(item.title) }}</div
          >
        </div>
      </div>
      <div v-if="currentIndex == 0" class="block_list_content">
        <h2>{{ $t('contract.one') }}{{ $t('contract.Getting_Started') }}</h2>
        <h3>{{ $t('contract.Utility_project_introduction') }}</h3>
      </div>
      <div v-if="currentIndex == 1" class="block_list_content">
        <h2>{{ $t('contract.two') }}{{ $t('contract.Mining') }}</h2>
        <h3>{{ $t('contract.How_to_mine_using_utility') }}</h3>
      </div>
      <div v-if="currentIndex == 2" class="block_list_content">
        <h2>{{ $t('contract.three') }}{{ $t('contract.Development') }}</h2>
        <h3>{{ $t('contract.Introduction_to_utility_development') }}</h3>
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
      min-height: 100vh;
      border-radius: 8px;
      position: relative;
      z-index: 10;
      margin: 39px auto 36px;
      display: flex;
      justify-content: center;

      .block_list_side {
        width: 20%;
        min-height: 100vh;
        border-radius: 8px;
        border: 1px solid #3edfcf;
        background: #f9f9f8;
        box-shadow:
          0px 4px 15px 0px rgba(92, 255, 243, 0.1),
          0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        margin-right: 25px;

        .block_list_side_header {
          height: 68px;
          line-height: 68px;
          border-radius: 8px;
          background: #fff;
          box-shadow:
            0px 4px 15px 0px rgba(92, 255, 243, 0.1),
            0px 4px 8px 0px rgba(0, 0, 0, 0.04);
          color: #0687a4;
          font-family: PingFang SC;
          font-size: 25px;
          font-weight: 600;
          padding-left: 22px;
        }

        .block_list_side_list {
          display: flex;
          flex-direction: column;
          padding: 20px;

          .block_list_side_list_item {
            color: #000;
            font-family: PingFang SC;
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 10px;
            cursor: pointer;

            &:hover {
              color: #3edfcf;
            }
          }
        }
      }

      .block_list_content {
        width: calc(80% - 25px);
        min-height: 100vh;
        border-radius: 8px;
        background: #f9f9f8;
        box-shadow:
          0px 4px 15px 0px rgba(92, 255, 243, 0.1),
          0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        padding: 16px;
        box-sizing: border-box;
        color: #000;
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: 400;

        h2 {
          margin: 0;
          padding: 10px 0;
          border-bottom: 1px solid #eaecef;
        }

        h3 {
          padding: 10px 0;
          border-bottom: 1px solid #eaecef;
        }
      }
    }
  }

  @media (min-width: 320px) and (max-width: 843px) {
    .content {
      .block_list {
        width: calc(100% - 36px);
        margin: 0 18px 36px;
        box-sizing: border-box;

        .block_list_side {
          display: none;
        }

        .block_list_content {
          width: 100%;

          h2 {
            font-size: 22px;
          }

          h3 {
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
