<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { AccountDetail, ApiAccountDetail } from '@/api/account.ts';
  import { getContractCode, getContractInfo } from '@/api/contract.ts';
  import { getTxnsAccount } from '@/api/transaction.ts';
  import TransactionTable from '@/components/TransactionTable.vue';
  import { parseContract } from '@/utils/contract/parseContract.ts';

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
  const contractInfo = ref([]);
  const tableData = ref([]);
  const totalItems = ref(0);
  const wasmBase64 = ref('');

  const handlePageChange = async (page: number) => {
    currentPage.value = page;
    await fetchTxnList(currentPage.value, pageSize.value, accountId as string);
  };

  function toggleButton(index: any) {
    buttons.value.forEach((button, idx) => {
      button.active = idx === index;
      // if (index === 0) {
      //   fetchTxnList(currentPage.value, pageSize.value, accountId as string);
      // }
    });
    currPage.value = index;
  }

  function toggleContractBtn(index: any) {
    contractBtns.value.forEach((button, idx) => {
      button.active = idx === index;
      if (index == 1 && idx == 1) {
        // loadWasm(contractDetail.value.code_base64);
        // loadWasm();
        fetchContractCode();
      }
    });
    currentConPage.value = index;
  }

  const fetchContractCode = async () => {
    const res = await getContractCode(accountId as string);
    wasmBase64.value = res.data.data.code_base64.replace(/\s/g, '');
    // console.log(await parseContract(wasmBase64.value));
    const pres = await parseContract(wasmBase64.value);
    // functions.value = pres.methodNames;
    // Functions filter __contract_abi and contract_source_metadata
    functions.value.length = 0;
    functions.value = pres.methodNames.filter(
      item => item !== '__contract_abi' && item !== 'contract_source_metadata',
    );
    console.log(functions.value);
  };

  const fetchContractInfo = async (accId: string) => {
    const res = await getContractInfo(accId);
    contractInfo.value = res.data.data;
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

  const args = ref<Argument[]>([]);
  interface Argument {
    name: string;
    type: string;
    value: string;
  }

  function addArgument() {
    args.value.push({ name: '', type: '', value: '' });
  }

  function removeArgument(index: number) {
    args.value.splice(index, 1);
  }

  interface Operation {
    id: string;
    method: string;
    attachedDeposit: string;
    gas: string;
  }

  const form = reactive<Operation>({});

  function submitQuery(item: Operation): void {
    console.log('SubmitQuery:', item);
  }

  onMounted(() => {
    fetchAccountInfo(accountId as string);
    fetchTxnList(currentPage.value, pageSize.value, accountId as string);
    fetchContractInfo(accountId as string);
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
          color="#0facb6"
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
        <div v-if="currPage === 0">
          <TransactionTable
            :tableData="tableData"
            :pageSize="pageSize"
            :currentPage="currentPage"
            :total="totalItems"
            @updatePage="handlePageChange"
          />
        </div>
        <div v-else-if="currPage === 1">
          <el-button
            v-for="(cBtn, index) in contractBtns"
            :key="index"
            color="#3EDFCF"
            plain
            @click="toggleContractBtn(index)"
          >
            {{ cBtn.label }}
          </el-button>
          <div v-if="currentConPage === 0">
            <div class="card_data">
              <div class="card_title">{{ $t('block_height') }}</div>
              <div class="content_father" style="color: #0facb6">
                <div class="card_content">{{ contractInfo.height }}</div>
              </div>
            </div>
            <div class="card_data">
              <div class="card_title">{{ $t('txn_hash') }}</div>
              <div class="content_father">
                <div class="card_content">{{ contractInfo.txn_hash }}</div>
              </div>
            </div>
            <div class="card_data">
              <div class="card_title">{{ $t('home.time') }}</div>
              <div class="content_father">
                <div class="card_content">{{ contractInfo.time_utc }}</div>
              </div>
            </div>
            <div class="card_data">
              <div class="card_title">{{ $t('code_hash') }}</div>
              <div class="content_father">
                <div class="card_content">{{ contractInfo.code_hash }}</div>
              </div>
            </div>
          </div>
          <div v-else-if="currentConPage === 1">
            <el-collapse accordion style="margin-top: 10px">
              <el-space direction="vertical" style="width: 100%" fill>
                <el-collapse-item
                  v-for="(item, index) in functions"
                  :key="index"
                  :title="index + 1 + '. ' + item"
                >
                  <el-form :model="form">
                    <el-form-item label="Arguments">
                      <el-button color="#3EDFCF" plain @click="addArgument"
                        >Add</el-button
                      >
                    </el-form-item>
                  </el-form>
                  <el-form inline>
                    <div
                      v-for="(arg, index) in args"
                      :key="index"
                      style="margin-bottom: 10px"
                    >
                      <el-space>
                        <el-input
                          v-model="arg.name"
                          placeholder="Argument name"
                          style="width: 150px"
                        ></el-input>
                        <el-select
                          v-model="arg.type"
                          placeholder="Type"
                          style="width: 100px"
                        >
                          <el-option label="String" value="string"></el-option>
                          <el-option label="Number" value="number"></el-option>
                          <el-option label="Boolean" value="bool"></el-option>
                          <el-option label="Null" value="undefined"></el-option>
                          <el-option label="Json" value="json"></el-option>
                        </el-select>
                        <el-input
                          v-model="arg.value"
                          placeholder="Argument value"
                          style="width: 150px"
                        ></el-input>
                        <el-button
                          icon="Delete"
                          @click="removeArgument(index)"
                        ></el-button>
                      </el-space>
                    </div>
                    <el-form-item label="Attached Deposit">
                      <el-input v-model="form.attachedDeposit"></el-input>
                    </el-form-item>
                    <el-form-item label="Gas">
                      <el-input
                        v-model="form.gas"
                        placeholder="30000000000000"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <el-form>
                    <el-form-item>
                      <el-button
                        color="#3EDFCF"
                        plain
                        @click="submitQuery(form)"
                        >Query</el-button
                      >
                      <el-button disabled>Write</el-button>
                    </el-form-item>
                  </el-form>
                </el-collapse-item>
              </el-space>
            </el-collapse>
          </div>
        </div>
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
    padding: 10px 5px 80px 5px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0 4px 15px 0 rgba(92, 255, 243, 0.1),
      0 4px 8px 0 rgba(0, 0, 0, 0.04);
    position: relative;
  }

  :deep(.el-collapse-item__header) {
    color: #191919;
    font-size: 15px;
    font-weight: 400;
    padding: 10px;
    background-color: transparent;
  }

  :deep(.el-collapse-item__header:hover) {
    border-color: #3edfcf !important;
  }

  :deep(.el-collapse-item__content) {
    padding: 10px;
    background: #f1f9f2;
    //border-bottom: 0.5px solid #3edfcf;
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
