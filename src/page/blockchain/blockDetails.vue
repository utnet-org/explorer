<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    BlockDetailsReq,
    BlockDetails,
    getBlockDetails,
  } from '@/api/block.ts';
  import { getTimeDiffFromTimestamp } from '@/utils/time.ts';

  const route = useRoute();
  const height = route.query.height ?? '';
  const blockDetails = reactive<BlockDetails>({});

  async function fetchBlockInfo(height: string) {
    var params: BlockDetailsReq = {
      query_type: 1,
      query_word: height,
    };
    const res = await getBlockDetails(params);
    Object.assign(blockDetails, res.data.data);
  }
  onMounted(() => {
    fetchBlockInfo(height as string);
  });
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title">区块 {{ height }}</div>
      <div class="card">
        <!--        <div class="card_data" v-for="(item, index) in cardData" :key="index">-->
        <div class="card_data">
          <div class="card_title">高度</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.height }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">哈希</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.hash }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">时间</div>
          <div class="content_father">
            <div class="card_content">
              {{
                getTimeDiffFromTimestamp(blockDetails.timestamp_nanosec ?? '')
              }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">交易</div>
          <div class="content_father">
            <div class="card_content">NaN</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">矿工</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.author }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">使用的 Gas</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_used }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">Gas 限制</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_limit }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">Gas 价格</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_price }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">Gas 费</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_fee }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">父哈希</div>
          <div class="content_father">
            <div class="card_content" style="color: #0687a4">{{
              blockDetails.prev_hash
            }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .details {
    padding: 0 72px;
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
