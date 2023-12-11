<script lang="ts" setup>
  import button_arrow from '@/assets/svgs/button_arrow.svg';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
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
</script>
<template>
  <div class="pag">
    <div></div>
    <div v-if="size !== Screen.Small">
      <div class="pagination">
        <el-pagination
          layout="prev, pager, next, jumper"
          :total="props.totalItems"
          :page-size="props.pageSize"
          @current-change="handlePageChange"
          prev-icon="CaretLeft"
          next-icon="CaretRight"
        >
        </el-pagination>
      </div>
    </div>

    <div v-show="props.showButton" class="button_arrow" @click="scrollToTop">
      <button_arrow />
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .pagss {
    width: 1px;
    height: 1px;
  }
  .pag {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 100px;
  }
  .button_arrow {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .pagination {
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
      padding: 0;
      margin: 10px;
      width: 23px;
      height: 23px;
    }
    //设置最左边的按钮
    :deep(.btn-prev) {
      width: 40px;
      height: 40px;
      color: #000;
      .el-icon {
        font-size: 20px;
      }
    }

    //设置最右边的按钮
    :deep(.btn-next) {
      width: 40px;
      height: 40px;
      color: #000;
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
      background: var#fff;
    }
  }

  @media (max-width: 768px) {
    .pag {
      padding-right: 50px;
    }
  }
</style>
