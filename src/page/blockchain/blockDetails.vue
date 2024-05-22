<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    BlockDetailsReq,
    BlockDetails,
    getBlockDetails,
  } from '@/api/block.ts';
  import { CompareStrTimeNano } from '@/utils/time.ts';
  import router from '@/route/route';

  const route = useRoute();
  const height = route.query.query_word ?? '';

  const query_type = route.query.query_type ?? 1;
  const blockDetails = reactive<BlockDetails>({});

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
  async function fetchBlockInfo(height: string, query_type: number) {
    var params: BlockDetailsReq = {
      query_type: Number(query_type),
      query_word: height,
    };
    const res = await getBlockDetails(params);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Object.assign(blockDetails, res.data.data);

    console.log('query_type', query_type);
    console.log('height', height);
    console.log('res', res);
  }
  onMounted(() => {
    void fetchBlockInfo(height as string, query_type as number);
  });
  // const BlockClick = (query: string) => {
  //    router.push({
  //     path: '/blockchain/details',
  //     query: { query_word: query, query_type: 2 },
  //   });
  //   void fetchBlockInfo(query as string, query_type as number);

  //   console.log('heightClick', query);
  // };
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title">{{ $t('blockChain.block') }} {{ height }}</div>
      <div class="card">
        <!--        <div class="card_data" v-for="(item, index) in cardData" :key="index">-->
        <div class="card_data">
          <div class="card_title">{{ $t('home.high') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.height }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.hash') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.hash }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.time') }}</div>
          <div class="content_father">
            <div class="card_content">
              {{ CompareStrTimeNano(blockDetails.timestamp_nanosec ?? '') }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.trade') }}</div>
          <div class="content_father">
            <div class="card_content"
              >{{ blockDetails.transactions }} {{ $t('home.trade') }}
              {{ $t('home.and') }} {{ blockDetails.receipts }}
              {{ $t('home.receipt') }}</div
            >
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.Miner') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.author }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.Gas_used') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_used }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.Gas_limit') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_limit }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.Gas_price') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_price }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.Gas_fee') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.gas_fee }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('home.parent_hash') }}</div>
          <div
            class="content_father"
            @click="BlockClick(blockDetails.prev_hash)"
          >
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
