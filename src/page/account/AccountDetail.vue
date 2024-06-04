<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { AccountDetail, ApiAccountDetail } from '@/api/account.ts';
  import { getContract } from '@/api/contract.ts';
  import { getTxnsAccount } from '@/api/transaction.ts';
  import TransactionTable from '@/components/TransactionTable.vue';

  const route = useRoute();
  const accountId = route.query.query_word ?? route.query.keyword;

  const buttons = ref([
    { label: 'Transaction', active: false },
    { label: 'Contract', active: false },
  ]);
  const contractBtns = ref([
    { label: 'Contract Info', active: true },
    { label: 'Contract Methods', active: false },
  ]);

  const currentPage = ref(1); // 当前页码
  const pageSize = ref(10);
  const currPage = ref(0);
  const currentConPage = ref(0);
  const functions = ref<string[]>([]);
  const pageContents = [0, 1];
  const contractDetail = ref();
  const tableData = ref([]);
  const totalItems = ref(0);

  const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await fetchTxnList(currentPage.value, pageSize.value, accountId as string);
  };

  function toggleButton(index: any) {
    buttons.value.forEach((button, idx) => {
      button.active = idx === index;
      if (index === 0) {
        fetchTxnList(currentPage.value, pageSize.value, accountId as string);
      }
    });
    currPage.value = index;
  }

  function toggleContractBtn(index: any) {
    contractBtns.value.forEach((button, idx) => {
      button.active = idx === index;
      if (index === 0) {
        fetchContractInfo(accountId as string);
      } else if (index == 1) {
        loadWasm(contractDetail.value.code_base64);
      }
    });
    currentConPage.value = index;
  }

  const wasmBase64 = ref('');

  const loadWasm = async (codeBase64: string) => {
    let wasmInstance;
    try {
      // const res = await getContract(accId);
      wasmBase64.value = codeBase64.replace(/\s/g, '');
      const wasmBinary = Uint8Array.from(atob(wasmBase64.value), c =>
        c.charCodeAt(0),
      );
      // test simple wasm
      // const wasmBinary = await (await fetch('/simple.wasm')).arrayBuffer();
      const wasmModule = await WebAssembly.compile(wasmBinary);
      const imports = {
        env: {
          abort: () => {},
          promise_results_count: () => {},
          promise_result: () => {},
          storage_has_key: () => {},
          storage_read: () => {},
          storage_write: () => {},
          storage_remove: () => {},
          storage_iter_create: () => {},
          storage_iter_next: () => {},
          memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
          table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
          promise_batch_then: () => {},
          promise_batch_create: () => {},
          promise_batch_action_create_account: () => {},
          promise_batch_action_deploy_contract: () => {},
          promise_batch_action_function_call: () => {},
          promise_batch_action_function_call_weight: () => {},
          promise_batch_action_transfer: () => {},
          promise_batch_action_stake: () => {},
          promise_batch_action_add_key_with_full_access: () => {},
          promise_batch_action_add_key_with_function_call: () => {},
          promise_batch_action_delete_key: () => {},
          promise_batch_action_delete_account: () => {},
          promise_and: () => {},
          promise_return: () => {},
          panic_utf8: () => {},
          register_len: () => {},
          read_register: () => {},
          current_account_id: () => {},
          signer_account_pk: () => {},
          predecessor_account_id: () => {},
          input: () => {},
          attached_deposit: () => {},
          value_return: () => {},
          log_utf8: () => {},
          block_index: () => {},
          storage_usage: () => {},
        },
      };
      wasmInstance = await WebAssembly.instantiate(wasmModule, imports);
      functions.value = [];
      const exs = wasmInstance.exports;
      for (const e in exs) {
        if (typeof exs[e] === 'function') {
          functions.value.push(e);
        }
      }
      console.log(functions.value);
    } catch (err) {
      console.error('Error loading Wasm:', err);
    }
  };
  const fetchContractInfo = async (accId: string) => {
    const res = await getContract(accId);
    contractDetail.value = res.data.data;
  };

  const detail = reactive<AccountDetail>({
    amount: '',
    block_hash: '',
    block_height: 0,
    code_hash: '',
    pledging: '',
    power: '',
    storage_paid_at: 0,
    storage_usage: 0,
  });

  async function fetchAccountInfo(accountId: string) {
    const res = await ApiAccountDetail(accountId);
    Object.assign(detail, res.data.data);
  }

  const fetchTxnList = async (
    page: number,
    size: number,
    accountId: string,
  ) => {
    const res = await getTxnsAccount(page, size, accountId);
    totalItems.value = res.data.data.total;
    tableData.value = res.data.data.txn_list;
  };

  onMounted(() => {
    fetchAccountInfo(accountId as string);
    fetchTxnList(currentPage.value, pageSize.value, accountId as string);
  });
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title">
        {{ $t('account') }}
        <div style="color: #0facb6"> &nbsp;{{ accountId }} </div>
      </div>
      <div class="card">
        <!--        <div class="card_data" v-for="(item, index) in cardData" :key="index">-->
        <div class="card_data">
          <div class="card_title">{{ $t('amount') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.amount }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('block_hash') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.block_hash }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('block_height') }}</div>
          <div class="content_father">
            <div class="card_content">
              {{ detail?.block_height }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('code_hash') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.code_hash }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('pledging') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.pledging }} UNC</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('power') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.power }} T</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('storage_paid_at') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.storage_paid_at }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('storage_usage') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.storage_usage }} Bytes</div>
          </div>
        </div>
      </div>
      <el-divider />
      <div style="padding-bottom: 20px">
        <el-button
          v-for="(button, index) in buttons"
          :key="index"
          color="#3EDFCF"
          plain
          @click="toggleButton(index)"
        >
          {{ button.label }}
        </el-button>
      </div>
      <el-card
        class="txn_list"
        v-show="currPage === index"
        v-for="index in pageContents"
        :key="index"
      >
        <div v-if="currPage === 1">
          <el-button
            v-for="(cBtn, index) in contractBtns"
            :key="index"
            color="#ade1db"
            plain
            @click="toggleContractBtn(index)"
          >
            {{ cBtn.label }}
          </el-button>
          <div v-if="currentConPage === 1">
            <div v-for="(m, index) in functions" :key="index">
              {{ m }}
            </div>
          </div>
          <div v-else>Contract Info </div>
        </div>
        <div v-else-if="currPage === 0">
          <TransactionTable
            :tableData="tableData"
            :pageSize="pageSize"
            :currentPage="currentPage"
            :total="totalItems"
            @updatePage="handlePageChange"
          />
        </div>
        <!--          <WasmComponent></WasmComponent>-->
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .details {
    padding: 0 36px;
    margin-bottom: 50px;
  }

  .details_title {
    height: 68px;
    font-size: 24px;
    color: #333333;
    display: flex;
    align-items: center;
  }

  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 0;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0px 4px 8px 0px rgba(0, 0, 0, 0.04),
      0px 4px 15px 0px rgba(92, 255, 243, 0.1);
  }

  .card_data {
    border-bottom: 1px solid #e9ecef;
    color: rgb(59, 67, 80);
    display: flex;
    // height: 52px;
    align-items: center;
    padding: 16px;
  }

  .card_title {
    flex: 1;
  }

  .content_father {
    flex: 3;
    display: flex;
  }

  .card_content {
  }

  .content_button {
    width: 60px;
    height: 25px;
    border-radius: 20px;
    background-color: #3edfcf;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-right: 14px;
  }

  .txn_list {
    padding: 10px 5px 100px 5px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0 4px 15px 0 rgba(92, 255, 243, 0.1),
      0 4px 8px 0 rgba(0, 0, 0, 0.04);
    position: relative;
  }
  @media (max-width: 1023px) {
    .details {
      padding: 0 42px;
      margin-top: 50px;
    }
  }
  @media (max-width: 843px) {
    .details {
      padding: 0 42px;
    }
    .card_data {
      flex-direction: column;
      align-items: start;
    }
    .card_title {
      margin-bottom: 10px;
    }
    .card_content {
      //换行

      overflow-wrap: break-word;
      white-space: wrap;

      word-wrap: break-word;
    }
  }
  @media (max-width: 520px) {
    .card_content {
      max-width: 280px;
    }
    .details {
      padding: 0px 22px;
    }
  }
</style>
