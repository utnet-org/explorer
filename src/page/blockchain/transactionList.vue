<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getTxnList } from '@/api/transaction.ts';
  import TransactionTable from '@/components/TransactionTable.vue';
  import HeaderPage from '@/components/otherHeaderContent.vue';

  onMounted(() => {
    fetchTxnList(currentPage.value, pageSize.value);
  });

  const tableData = ref([]);
  const currentPage = ref(1); // 当前页码
  const pageSize = ref(10); // 每页显示条目数
  const totalItems = ref(tableData.length);

  const fetchTxnList = async (page: number, size: number) => {
    const res = await getTxnList(page, size);
    totalItems.value = res.data.data.total;
    tableData.value = res.data.data.txn_list;
  };

  const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await fetchTxnList(currentPage.value, pageSize.value);
  };
</script>

<template>
  <div class="content">
    <HeaderPage />
    <div style="height: 160px"></div>
    <!--    <div class="block_list">-->
    <el-card class="txn_list">
      <TransactionTable
        :tableData="tableData"
        :pageSize="pageSize"
        :currentPage="currentPage"
        :total="totalItems"
        @updatePage="handlePageChange"
      />
    </el-card>
    <!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
  .content {
    width: 100%;
    min-height: 100vh;
    background: #f2f0ea;
    position: relative;
  }
  .txn_list {
    padding: 10px 5px 100px 5px;
    margin: 30px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0 4px 15px 0 rgba(92, 255, 243, 0.1),
      0 4px 8px 0 rgba(0, 0, 0, 0.04);
    position: relative;
    z-index: 10;
  }
</style>
