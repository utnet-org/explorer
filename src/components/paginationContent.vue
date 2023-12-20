<!-- eslint-disable @typescript-eslint/explicit-function-return-type -->
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import button_arrow from '@/assets/svgs/button_arrow.svg';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import en from 'element-plus/dist/locale/en.mjs';
  import i18n from '@/lang';
  const size = getScreenSize().currentScreenSize;
  // 父组建传入数据
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    showButton: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(['pageChange']);

  // 处理分页更改
  const handlePageChange = (page: number) => {
    // 发出页面更改事件，携带新的页面索引
    emit('pageChange', page);
  };

  // 回到顶部的方法
  const scrollToTop = () => {
    // 使用原生的 window.scrollTo 方法
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 从 vue-i18n 实例获取当前语言设置
  const language = ref(i18n.global.locale);
  // 根据 language 值决定使用哪个 Element Plus 本地化对象
  const locale = computed(() => (language.value === 'zh' ? zhCn : en));

  // 当 vue-i18n 的 locale 变化时，更新 language
  watch(
    () => i18n.global.locale,
    newLocale => {
      language.value = newLocale;
    },
  );

  // 当 language 变化时，更新 vue-i18n 的 locale 和 Element Plus 的 locale
  watch(language, newLanguage => {
    i18n.global.locale = newLanguage;
    // 由于 locale 是计算属性，它会自动根据 language 的新值重新计算
  });
</script>
<template>
  <div class="pag">
    <div v-if="size == Screen.Large" class="pagination">
      <el-config-provider :locale="locale">
        <el-pagination
          layout="prev, pager, next, jumper"
          :total="props.totalItems"
          :page-size="props.pageSize"
          prev-icon="CaretLeft"
          next-icon="CaretRight"
          @current-change="handlePageChange"
        >
        </el-pagination>
      </el-config-provider>
    </div>

    <div v-show="props.showButton" class="button_arrow" @click="scrollToTop">
      <button_arrow />
    </div>
  </div>
</template>

<style scoped lang="scss">
  :deep(.pagination .el-pager li) {
    color: rgba(25, 25, 25, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .pagin {
    position: absolute;
    z-index: 10;
    width: 100%;
  }

  .pag {
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 0 35px;
  }
  .button_arrow {
    display: flex;
    justify-content: flex-end;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-pagination {
      --el-pagination-bg-color: transparent;
      --el-pagination-hover-color: none;
    }
    :deep(.el-pagination button.is-disabled),
    :deep(.el-pagination button:disabled) {
      background-color: transparent !important;
    }

    :deep(.el-pager li.is-active) {
      color: #191919;
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      cursor: default;
      background-color: #3edfcf;
      border-radius: 50%;
      box-shadow: 0 0px 5px 6px rgba(62, 223, 207);
    }
    :deep(.el-pager li) {
      min-width: 24px;
    }
    :deep(li.number) {
      color: rgba(25, 25, 25, 0.3);
      padding: 0;
      margin: 10px;
      width: 23px;
      height: 23px;
    }
    //设置最左边的按钮
    :deep(.btn-prev) {
      width: 40px;
      height: 40px;
      .el-icon {
        font-size: 20px;
      }
    }

    //设置最右边的按钮
    :deep(.btn-next) {
      width: 40px;
      height: 40px;
      .el-icon {
        font-size: 20px;
      }
    }

    /* 使用深度选择器定位分页器的输入框 */
    //  .el-input--default .el-pagination__editor .is-in-pagination
    :deep(.el-input) {
      width: 81px !important;
    }
    :deep(.el-pagination .el-input__wrapper) {
      width: 81px !important;
      height: 17px;
      border-radius: 31px;
      border: 0.5px solid #3edfcf;
      background: #fff;
    }
  }

  @media (max-width: 1439px) {
    .pag {
      padding-right: 20px;
    }
    .button_arrow {
      width: 100%;
    }
  }
</style>
