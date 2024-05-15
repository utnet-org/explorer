<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    BlockDetailsId,
  } from '@/api/block.ts';
import { ApiMetworkValidator } from '@/api/chart';

  const route = useRoute();
  const Account_ID = route.query.query_word ?? '';

  const blockDetails = reactive<BlockDetailsId>({});

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
  async function fetchBlockInfo(Account_ID: string) {
    const res = await ApiMetworkValidator({ account_id: Account_ID });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    Object.assign(blockDetails, res.data.data);
   
    console.log('query_type', query_type);
    console.log('Account_ID', Account_ID);
    console.log('res', res);
  }
  onMounted(() => {
    // ApiMetworkValidators
    void fetchBlockInfo(Account_ID as string);
  });

</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title"> {{ $t('home.Miner') + '  ' + Account_ID }}</div>
      <div class="card">
        <!--        <div class="card_data" v-for="(item, index) in cardData" :key="index">-->
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Account_ID') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.account_id }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.whether_to_punish') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.is_slashed }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Expected_Block') }}</div>
          <div class="content_father">
            <div class="card_content">
              {{ blockDetails.num_expected_blocks }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Expected_Chunk') }}</div>
          <div class="content_father">
            <div class="card_content">{{
              blockDetails.num_produced_chunks
            }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Output_Block') }}</div>
          <div class="content_father">
            <div class="card_content">{{
              blockDetails.num_produced_blocks
            }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Output_Chunk') }}</div>
          <div class="content_father">
            <div class="card_content">{{
              blockDetails.num_produced_chunks
            }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Pledge_amount') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.pledge }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.Computing_power') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.power }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('blockChain.public_key') }}</div>
          <div class="content_father">
            <div class="card_content">{{ blockDetails.public_key }}</div>
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
