<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ChipInfo, getChipInfo } from '@/api/chip.ts';

  const route = useRoute();
  const key = route.query.query_word ?? '';

  const infos = reactive<ChipInfo[]>([{}]);
  // const info = reactive<ChipInfo>({});

  async function fetchChipInfo(key: string) {
    const res = await getChipInfo(key);
    // Object.assign(info, res.data.data[0]);
    Object.assign(infos, res.data.data);
  }
  onMounted(() => {
    fetchChipInfo(key as string);
  });
</script>
<template>
  <div class="content">
    <div class="details">
      <div class="details_title">芯片</div>
      <div class="card">
        <div class="card_data">
          <div class="card_title">类型</div>
          <div class="content_father">
            <div class="card_content">{{ infos[0].chip_type }}</div>
          </div>
        </div>

        <div class="card_data">
          <div class="card_title">序列号</div>
          <div class="content_father">
            <div class="card_content">{{ infos[0].serial_number }}</div>
          </div>
        </div>
      </div>
      <div class="card" v-for="(item, index) in infos" :key="index">
        <div class="card_data">
          <div class="card_title" style="color: #0facb6">卡槽号</div>
          <div class="content_father">
            <div class="card_content">
              {{ item.bus_id }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">算力</div>
          <div class="content_father">
            <div class="card_content">{{ item.power }}</div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">p2key</div>
          <div class="content_father">
            <div class="card_content">
              {{ item.p2key }}
            </div>
          </div>
        </div>
        <div class="card_data">
          <div class="card_title">公钥</div>
          <div class="content_father">
            <div class="card_content">{{ item.public_key }}</div>
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
    width: 340px;
    flex-shrink: 0;
  }

  .content_father {
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏超出容器的内容 */
    text-overflow: ellipsis; /* 显示省略号 */
    max-width: 100%;
    // flex: 0 0 auto; /* 右边盒子不扩展 */
    // flex: 3;
    // display: flex;
  }

  .card_content {
    width: 100%;
    // 超出显示省略号
    white-space: nowrap; /* 防止文本换行 */
    overflow: hidden; /* 隐藏超出容器的内容 */
    text-overflow: ellipsis; /* 显示省略号 */

    &:hover {
      white-space: normal; /* 允许文本换行 */
      overflow-wrap: break-word; /* 单词内换行 */
    }
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
