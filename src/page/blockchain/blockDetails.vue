<script setup lang="ts">
const cardData = [
  {
    title: '区块高度',
    content: '116315',
    istitle: '区块高度',
  },
  {
    title: '交易哈希',
    content: '45fTuPoBxaXM77moXiQvm2NdKZ7YTVfDpaxujUnVutZL',
    istitle: '交易哈希',
  },
  {
    title: '区块时间',
    content: 'a few seconds ago (Apr-07-2024 11:26:13 AM) +UTC',
    istitle: '区块时间',
  },
  {
    title: '交易',
    content: '和 223 回执',
    istitle: '交易',
  },
  {
    title: '矿工',
    content: 'baziliknear.poolv1.near',
    istitle: '矿工',
  },
  {
    title: '使用的 Gas',
    content: '636 Tgas',
    istitle: '使用的 Gas',
  },
  {
    title: 'Gas 限制',
    content: '6.00 Pgas',
    istitle: 'Gas 限制',
  },
  {
    title: 'Gas 价格',
    content: '0.0001 Ⓝ / Tgas',
    istitle: 'Gas 价格',
  },
  {
    title: 'Gas 费',
    content: '0.06363 Ⓝ',
    istitle: 'Gas 费',
  },
  {
    title: '父哈希',
    content: '9J6gLTfqEsgf7diiXGWdPRVUsb1GpAi3fik6oQ8q8Fsc',
    istitle: '父哈希',
  },
];
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title" v-pre>区块{{ 块 }}</div>
      <div class="card">
        <div class="card_data" v-for="(item, index) in cardData" :key="index">
          <div class="card_title">{{ item.title }}</div>
          <div class="content_father">
            <div v-if="item.istitle == '交易'" class="content_button">
              65 交易</div
            >
            <div
              :style="{
                color: item.istitle == '父哈希' ? '#0687A4' : 'rgb(59, 67, 80)',
              }"
              class="card_content"
              >{{ item.content }}</div
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- 14, 57, 57 -->
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
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04),
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