<template>
  <div class="peak_content_top_side_search">
    <input
      type="text"
      v-model="searchFilter"
      :placeholder="$t('home.search')"
    />
    <img
      id="search-btn"
      class="peak_content_top_side_search_btn"
      src="../assets/images/home_search_icon.png"
      alt=""
      @click="handleSearch"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { getSearchFilter } from '@/api/overview.ts';
  import router from '@/route/route.ts';

  const searchFilter = ref('');
  const emit = defineEmits(['searchFilter']);

  const handleSearch = async () => {
    const result = await fetchSearchFilter();
    emit('searchFilter', result);
  };

  onMounted(() => {
    window.addEventListener('keypress', handleKeyPress);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('keypress', handleKeyPress);
  });

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      const searchButton = document.getElementById(
        'search-btn',
      ) as HTMLImageElement;
      if (searchButton) {
        searchButton.click();
      }
    }
  };

  const fetchSearchFilter = async () => {
    const keyword = searchFilter.value.trim();
    const response = await getSearchFilter(keyword);
    if (response.data.code === 0) {
      // 搜索type 1账户 2块高度 3块哈希 4地址 5交易 6消息 7芯片
      if (response.data.data.query_type == 1) {
        void router.push({
          path: '/account/detail',
          query: { query_word: response.data.data.keyword },
        });
      }
      if (response.data.query_type == 2) {
        void router.push({
          path: '/blockchain/details',
          query: { query_word: keyword },
        });
      }
      if (response.data.query_type == 3) {
        void router.push({
          path: '/blockchain/details',
          // block详情type 1高度 2哈希
          query: { query_word: keyword, query_type: 2 },
        });
      }
      if (response.data.query_type == 5) {
        void router.push({
          path: '/blockchain/transactionDetails',
          query: { keyword: keyword },
        });
      }
      if (response.data.query_type == 7) {
        void router.push({
          path: '/chip/chipInfo',
          query: { query_word: keyword },
        });
      }
    } else {
      alert(response.data.data.message_zh);
    }
    return response.data.data;
  };
</script>

<style scoped lang="scss">
  @media screen and (min-width: 1440px) {
    .peak_content_top_side_search {
      width: 683px;
      height: 50px;
      border-radius: 8px;
      background: #fff;
      margin: 14px 0 9px 0;
      padding: 0 6px 0 9px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .peak_content_top_side_search_type {
        color: #000;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        margin-right: 8px;
      }

      .peak_content_top_side_search_type_icon {
        width: 12px;
        height: 8px;
      }

      input {
        flex: 1;
        margin: 0 22px;
        background-color: transparent;
        border: none;
        outline: none;
        color: #000;
      }

      .peak_content_top_side_search_btn {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
  @media screen and (min-width: 320px) and (max-width: 1439px) {
    .peak_content_top_side_search {
      width: 100%;
      height: 50px;
      border-radius: 8px;
      background: #fff;
      margin: 14px 0 0 0;
      padding: 0 6px 0 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .peak_content_top_side_search_type {
        color: #000;
        font-family: PingFang SC;
        font-size: 14px;
        font-weight: 400;
        margin-right: 8px;
      }

      .peak_content_top_side_search_type_icon {
        width: 12px;
        height: 8px;
      }

      input {
        flex: 1;
        margin: 0 22px;
        background-color: transparent;
        border: none;
        outline: none;
        color: #000;
      }

      .peak_content_top_side_search_btn {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
</style>
