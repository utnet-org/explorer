<script setup lang="ts">
// 最新区块
import { onMounted, ref } from 'vue';
import HeaderPage from '../../components/otherHeaderContent.vue';
// const windowWidth = ref(document.documentElement.clientWidth);

//监听窗口大小变化
onMounted(() => {

});
const articleList = [
  {
    id: '',
    title: '入门篇'
  },
  {
    id: '',
    title: '挖矿篇'
  },
  {
    id: '',
    title: '开发篇',
  }
]
const currentIndex = ref(0);
const changeContent = (index: number) => {
  currentIndex.value = index;
}
</script>
<template>
  <div class="content">
    <!-- 头部 -->
    <HeaderPage />
    <div style="height: 200px"></div>
    <div class="block_list">
      <div class="block_list_side">
        <div class="block_list_side_header">文章列表</div>
        <div class="block_list_side_list">
          <div class="block_list_side_list_item" v-for="(item, index) in articleList" :key="index"
            @click="changeContent(index)">{{ index + 1 }}.{{
              item.title }}</div>
        </div>
      </div>
      <div class="block_list_content" v-if="currentIndex == 0">
        <h2>一、入门篇</h2>
        <h3>utility项目介绍</h3>
      </div>
      <div class="block_list_content" v-if="currentIndex == 1">
        <h2>二、挖矿篇</h2>
        <h3>utility要如何挖矿</h3>
      </div>
      <div class="block_list_content" v-if="currentIndex == 2">
        <h2>三、开发篇</h2>
        <h3>utility开发介绍</h3>
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
      border: 1px solid #3EDFCF;
      background: #F9F9F8;
      box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
      margin-right: 25px;

      .block_list_side_header {
        height: 68px;
        line-height: 68px;
        border-radius: 8px;
        background: #FFF;
        box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        color: #0687A4;
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
            color: #3EDFCF;
          }
        }
      }
    }

    .block_list_content {
      width: calc(80% - 25px);
      min-height: 100vh;
      border-radius: 8px;
      background: #F9F9F8;
      box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
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
