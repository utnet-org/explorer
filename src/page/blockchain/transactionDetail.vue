<script setup lang="ts">
  import correct from '@/assets/svgs/zhengque.svg';
  import mistake from '@/assets/svgs/cuowu.svg';
  import rightarrow from '@/assets/svgs/Rightarrow_de.svg';
  import { useRoute } from 'vue-router';
  import { computed, onMounted, reactive, ref } from 'vue';
  import { getTxnDetail, TxnInfo, ReceiptElement } from '@/api/transaction.ts';
  import { CompareTimestampNano } from '@/utils/time.ts';
  import { DivBigPowerStrOfTen, DivBigPowerOfTen } from '@/utils/math.ts';
import router from '@/route/route';

  const route = useRoute();
  const hash = route.query.hash ?? route.query.keyword;
  const infos = reactive<TxnInfo>({});
  const activeNames = ref<string[]>([]);

  async function fetchTxnInfo(hash: string) {
    const res = await getTxnDetail(hash);
    const resData = res.data.data;
    if (resData.receipts) {
      resData.receipts.forEach((receipt: ReceiptElement) => {
        const actionsJson = JSON.stringify(
          receipt.receipt.Action.actions,
          null,
          4,
        );
        const lines = actionsJson.split('\n');
        if (lines.length > 2) {
          receipt.receipt.Action.actions = lines.slice(1, -1).join('\n');
        } else {
          receipt.receipt.Action.actions = actionsJson;
        }
      });
    }
    Object.assign(infos, resData);
  }

  onMounted(() => {
    fetchTxnInfo(hash as string);
    activeNames.value = ['receipts'];
  });

  const ClickPush = (hash: string, type: string) => {
    if (type === 'BlockHash') {
      void router.push({
        path: '/blockchain/details',
        // block详情type 1高度 2哈希
        query: { query_word: hash, query_type: 2 },
      });
    } else if (type === 'sender') {
      if (isValidReceiverAddress(hash)) {
        void router.push({
          path: '/account/detail',
          // block详情type 1高度 2哈希
          query: { query_word: hash },
        });
      }
    } else if (type === 'receiver') {
      if (isValidReceiverAddress(hash)) {
        void router.push({
          path: '/account/detail',
          // block详情type 1高度 2哈希
          query: { query_word: hash },
        });
      }
    }
  };

  // 判断地址是否有 64 个字符
  const isValidReceiverAddress = (address: string) => {
    return address.length === 64;
  };
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title">{{ $t('static.Transaction_Details') }}</div>
      <div class="card">
        <div class="card_data">
          <div class="card_title">{{ $t('static.Transaction_Hash') }}</div>
          <div class="content_father">
            <div class="card_content">{{ infos.hash }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.status') }}</div>
          <div class="content_father">
            <div v-if="infos.status !== ''" class="Success">
              <correct />
              Success
            </div>
            <div v-else class="Fail">
              <mistake />
              Fail
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.height') }}</div>
          <div class="content_father">
            <div class="card_content">{{ infos.height }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.time') }}</div>
          <div class="content_father">
            <div class="card_content"
              >{{ CompareTimestampNano(infos.timestamp) }}
              {{ infos.time_utc }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.sender') }}</div>
          <div class="content_father">
            <div class="card_content">{{ infos.signer_id }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.receiver') }}</div>
          <div class="content_father">
            <div class="card_content">{{ infos.receiver_id }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">Tokens Transferred</div>
          <div class="cont_arr">
            <div class="card_content">
              <rightarrow />
              {{ 'NaN' }}
            </div>
            <!--            <div class="card_content">-->
            <!--              <rightarrow />From system To i7169098064.tg For 0.006015 HOTHOT (-->
            <!--              HOT)</div-->
            <!--            >-->
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('contract.DepositValue') }}</div>
          <div class="content_father">
            <div class="card_content"
              >{{ infos.deposit != '' ? infos.deposit : 0 }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('static.transaction_fee') }}</div>
          <div class="content_father">
            <div class="card_content">{{ infos.txn_fee }} UNC</div>
          </div>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item
            :title="$t('static.ReturnReceiptDetails')"
            name="receipts"
          >
            <div v-for="(rec, index) in infos.receipts" :key="index">
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('static.Receipt_ID') }}</div>
                <div class="collapse_data"
                  >{{
                    infos.receipts_outcome
                      ? infos.receipts_outcome[index].id
                      : 'NaN'
                  }}
                </div>
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('static.Block_Hash') }}</div>
                <div
                  class="collapse_data collapse_data1"
                  @click="
                    ClickPush(
                      infos.receipts_outcome
                        ? infos.receipts_outcome[index].block_hash
                        : 'NaN',
                      'BlockHash',
                    )
                  "
                  >{{
                    infos.receipts_outcome
                      ? infos.receipts_outcome[index].block_hash
                      : 'NaN'
                  }}
                </div>
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('home.sender') }}</div>
                <div
                  class="collapse_data"
                  :class="{
                    collapse_data1: isValidReceiverAddress(rec.predecessor_id),
                  }"
                  @click="ClickPush(rec.predecessor_id, 'sender')"
                  >{{ rec.predecessor_id }}</div
                >
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('home.receiver') }}</div>
                <div
                  :class="{
                    collapse_data1: isValidReceiverAddress(rec.receiver_id),
                  }"
                  class="collapse_data"
                  @click="ClickPush(rec.receiver_id, 'receiver')"
                  >{{ rec.receiver_id }}</div
                >
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{
                  $t('static.Gas_and_tokens_consumed')
                }}</div>
                <div class="collapse_data"
                  ><span class="span_bg"
                    >🔥
                    {{
                      infos.receipts_outcome
                        ? DivBigPowerOfTen(
                            infos.receipts_outcome[index].outcome.gas_burnt,
                            12,
                          )
                        : 'NaN'
                    }}
                    Tgas ｜
                    {{
                      infos.receipts_outcome
                        ? DivBigPowerStrOfTen(
                            infos.receipts_outcome[index].outcome.tokens_burnt,
                            24,
                          )
                        : 'NaN'
                    }}
                    UNC</span
                  ></div
                >
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('static.action') }}</div>
                <div class="collapse_data">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 3, maxRows: 10 }"
                    v-model="rec.receipt.Action.actions"
                    placeholder="The actions performed during receipt processing"
                    readonly
                  />
                </div>
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('static.result') }}</div>
                <div class="collapse_data">Empty Result</div>
              </div>
              <div class="collapse_father">
                <div class="collapse_title">{{ $t('static.logs') }}</div>
                <div
                  v-if="infos.receipts_outcome![index].outcome.logs.length == 0"
                  class="collapse_data"
                  >No Logs
                </div>
                <div
                  v-else-if="
                    infos.receipts_outcome![index].outcome.logs.length != 0
                  "
                  class="collapse_data"
                >
                  <el-input
                    type="textarea"
                    v-model="infos.receipts_outcome![index].outcome.logs"
                    :rows="3"
                    placeholder="Logs included in the receipt"
                    readonly
                    class="json-textarea"
                  />
                </div>
              </div>
              <el-divider></el-divider>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  ::v-deep(.el-textarea__inner) {
    background-color: #f3f4f6;
  }

  ::v-deep(.el-textarea) {
    --el-input-focus-border-color: #3edfcf;
  }

  .collapse_father {
    display: flex;
    margin: 10px 0;
  }

  .span_bg {
    background: rgba(255, 189, 71, 0.26);
    border-radius: 4px;
    padding: 2px 8px;
  }

  .el-collapse {
    padding-left: 16px;
    background: #f9f9f8;
  }

  .collapse_title {
    flex: 1;
  }

  .collapse_data {
    flex: 3;
    margin-right: 24px;
  }
  .collapse_data1 {
    //鼠标
    cursor: pointer;
    color: #3edfcf;
    // 下划线
    line-height: 24px;

    text-decoration: underline;
  }
  ::v-deep(.el-collapse-item__header) {
    color: #0facb6;
    font-size: 15px;
    border: none;
    background-color: transparent;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  ::v-deep(.el-collapse-item__wrap) {
    background: #f9f9f8;
  }

  ::v-deep(.el-collapse-item__content) {
    padding-bottom: 10px;
  }

  :global(button:focus, button:focus-visible) {
    outline: none;
  }

  * {
    box-sizing: border-box;
  }

  .details {
    padding: 0 72px;
    margin-bottom: 50px;
  }

  .details_title {
    height: 68px;
    font-size: 20px;
    color: #333333;
    display: flex;
    align-items: center;
  }

  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow:
      0 4px 8px 0 rgba(0, 0, 0, 0.04),
      0 4px 15px 0 rgba(92, 255, 243, 0.1);
  }

  .card_data {
    border-bottom: 1px solid #e9ecef;
    color: rgb(59, 67, 80);
    display: flex;
    font-size: 14px;

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

  .Success {
    width: 86px;
    height: 25px;
    background-color: rgba(0, 255, 229, 0.153);
    color: #3edfcf;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 6px;
  }

  .Fail {
    width: 86px;
    height: 25px;
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff0000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-radius: 6px;
  }

  .content_button {
    width: 60px;
    height: 25px;
    border-radius: 20px;
    background-color: #3edfcf;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    margin-right: 14px;
  }

  .more {
    color: #3edfcf;
    font-size: 14px;
    padding: 16px;
    display: flex;
    align-items: center;
  }

  .cont_arr {
    display: flex;
    flex-direction: column;
    flex: 3;
    gap: 10px;
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
      padding: 0 22px;
    }
  }
</style>
