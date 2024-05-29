<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { AccountDetail, ApiAccountDetail } from '@/api/account.ts';

  const route = useRoute();
  const accountId = route.query.query_word ?? '';

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
  onMounted(() => {
    void fetchAccountInfo(accountId as string);
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
            <div class="card_content">{{ detail?.pledging }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">{{ $t('power') }}</div>
          <div class="content_father">
            <div class="card_content">{{ detail?.power }}</div>
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
            <div class="card_content">{{ detail?.storage_usage }}</div>
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
