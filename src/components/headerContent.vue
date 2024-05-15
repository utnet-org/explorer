<script setup lang="ts">
  import {
    getOverviewInfo,
    getSearchFilter,
    OverviewInfo,
  } from '@/api/overview.ts';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { compareTimestampNano } from '@/utils/time.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';
import router from '@/route/route';
import { getBlockDetails } from '@/api/block';

  let intervalId: number | undefined;
  defineProps<{ fromPage: string }>();

  const ovData = reactive<OverviewInfo>({});
  const lastTime = ref('');
  const size = getScreenSize().currentScreenSize;

  async function fetchOverviewInfo() {
    const response = await getOverviewInfo();
    Object.assign(ovData, response.data.data);
    lastTime.value = compareTimestampNano(ovData.latest_block);
  }

  async function fetchSearchFilter() {
    const response = await getSearchFilter();
    Object.assign(ovData, response.data.data);
    lastTime.value = compareTimestampNano(ovData.latest_block);
  }

  onMounted(() => {
    intervalId = window.setInterval(() => {
      fetchOverviewInfo();
      // timeDifference();
    }, 10000);
  });

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  });
  const showMore = ref(false);
  const goToMore = (type: boolean) => {
    showMore.value = type;
  };
  const searchFilter = ref('');
  const searchClick = async () => {
    const height = searchFilter.value.trim();
    if (searchFilter.value.trim() !== '') {
      console.log('search', searchFilter.value.trim());
      const res = await getBlockDetails({query_word: height, query_type: 1});

 if(res.data.code !== -1){
     void router.push({
        path: '/blockchain/details',
        query: { query_word: height, query_type: 1 },
      });
}else{
  console.log('res.data.message',res.data.data.message);
  
}

      
    }
  };
</script>
<template>
  <div class="lowest_content">
    <div class="middle_content">
      <div class="peak_content_top">
        <div class="peak_content_top_side">
          <div class="peak_content_top_side_title">{{
            $t('home.unc_explorer')
          }}</div>
          <div class="peak_content_top_side_search">
            <input type="text" v-model="searchFilter" name="" id="" :placeholder="$t('home.search')" />
            <img
              class="peak_content_top_side_search_btn"
              src="../assets/images/home_search_icon.png"
              alt=""
              @click="searchClick()"
            />
          </div>
        </div>
      </div>
      <div
        v-if="fromPage == 'home' && size !== Screen.Small"
        class="peak_content_section"
      >
        <div class="peak_content_section_above">
          <div class="peak_content_section_item first_item">
            <div>{{ $t('home.height') }}</div>
            <div>{{ ovData.height }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item second_item">
            <div>{{ $t('home.latest_time') }}</div>
            <div>{{ lastTime }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>{{ $t('home.total_power') }}</div>
            <div>{{ ovData.total_power }} TFLOPS</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>{{ $t('home.miner') }}</div>
            <div>{{ ovData.active_miner }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>{{ $t('home.block_reward') }}</div>
            <div>{{ ovData.block_reward }} UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_under">
          <div class="peak_content_section_item first_item">
            <div>{{ $t('home.average_revenue') }}</div>
            <div>{{ ovData.day_ave_reward }} UNC/TFLOPS</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item second_item">
            <div>{{ $t('home.day_output') }}</div>
            <div>{{ ovData.dayProduction }} UNC</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>{{ $t('home.day_messages') }}</div>
            <div>{{ ovData.day_messages }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>{{ $t('home.accounts') }}</div>
            <div>{{ ovData.total_account }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>{{ $t('home.average_interval') }}</div>
            <div>{{ ovData.aveBlockInterval }} {{ $t('home.second') }}</div>
          </div>
        </div>
        <div class="peak_content_section_line" v-if="showMore"></div>
        <div class="peak_content_section_under" v-if="showMore">
          <div class="peak_content_section_item first_item">
            <div>{{ $t('home.average_revenue') }}</div>
            <div>{{ ovData.day_ave_reward }} UNC/TFLOPS</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item second_item">
            <div>{{ $t('home.day_output') }}</div>
            <div>{{ ovData.dayProduction }} UNC</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>{{ $t('home.day_messages') }}</div>
            <div>{{ ovData.day_messages }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>{{ $t('home.accounts') }}</div>
            <div>{{ ovData.total_account }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>{{ $t('home.average_interval') }}</div>
            <div>{{ ovData.aveBlockInterval }} {{ $t('home.second') }}</div>
          </div>
        </div>
        <div class="more" @click="goToMore(true)" v-if="!showMore">{{
          $t('home.see_more')
        }}</div>
        <div class="more" @click="goToMore(false)" v-if="showMore">{{
          $t('home.close')
        }}</div>
      </div>
      <div
        v-if="fromPage == 'home' && size == Screen.Small"
        class="peak_content_section"
      >
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>{{ $t('home.height') }}</div>
            <div>{{ ovData.height }}</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>{{ $t('home.latest_time') }}</div>
            <div>{{ lastTime }}</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>{{ $t('home.total_power') }}</div>
            <div>{{ ovData.total_power }} TFLOPS</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>{{ $t('home.miner') }}</div>
            <div>{{ ovData.active_miner }}</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>{{ $t('home.block_reward') }}</div>
            <div>{{ ovData.block_reward }} UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item first_item">
            <div>{{ $t('home.average_revenue') }}</div>
            <div>{{ ovData.day_ave_reward }} UNC/TFLOPS</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item second_item">
            <div>{{ $t('home.day_output') }}</div>
            <div>{{ ovData.dayProduction }} UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item third_item">
            <div>{{ $t('home.day_messages') }}</div>
            <div>{{ ovData.day_messages }}</div>
          </div>
          <div class="peak_content_section_line"></div>
          <div class="peak_content_section_above">
            <div class="peak_content_section_item fourth_item">
              <div>{{ $t('home.accounts') }}</div>
              <div>{{ ovData.total_account }}</div>
            </div>
          </div>
          <div class="peak_content_section_line"></div>
          <div class="peak_content_section_above">
            <div class="peak_content_section_item fifth_item">
              <div>{{ $t('home.average_interval') }}</div>
              <div>{{ ovData.aveBlockInterval }} {{ $t('home.second') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  @media screen and (min-width: 1440px) {
    .lowest_content {
      width: 100%;
      height: 100%;
      background-image: url('../assets/images/home_lowest_background.png');
      background-size: cover;

      .middle_content {
        width: 100%;
        height: 100%;
        background-image: url('../assets/images/home_middle_background.png');
        background-size: cover;

        .peak_content_top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin: 0 119px 0 33px;

          .peak_content_top_side {
            margin-top: 65.47px;

            .peak_content_top_side_title {
              color: #191919;
              font-family: PingFang SC;
              font-size: 20px;
              font-weight: 600;
            }

            .peak_content_top_side_search {
              width: 683px;
              height: 50px;
              border-radius: 8px;
              background: #fff;
              margin: 14px 0 9px 0;
              padding: 0 6px 0 9px;
              box-sizing: border-box;
              display: flex;
              align-items: center;

              .peak_content_top_side_search_type {
                color: #000;
                font-family: PingFang SC;
                font-size: 14px;
                font-weight: 400;
                margin-right: 8px;
              }

              .peak_content_top_side_search_type_icon {
                width: 12px;
                height: 8px;
              }

              input {
                flex: 1;
                margin: 0 22px;
                background-color: transparent;
                border: none;
                outline: none;
                color: #000;
              }

              // .input_placeholder_style {
              //     color: #000;
              //     font-family: PingFang SC;
              //     font-size: 14px;
              //     font-weight: 300;
              //     opacity: 0.5;
              // }

              .peak_content_top_side_search_btn {
                width: 40px;
                height: 40px;
                cursor: pointer;
              }
            }
          }

          .peak_content_top_right {
            width: 474px;
            height: 173px;
            margin-top: 42.47px;
            position: relative;

            .middle_image {
              width: 167.305px;
              height: 151.814px;
              position: absolute;
              bottom: 0px;
              left: 0;
              z-index: 7;
            }

            .lowest_image {
              width: 404px;
              height: 148px;
              border-radius: 12px;
              position: absolute;
              top: 0;
              right: 0;
              z-index: 5;
            }

            .peak_content_top_right_lowest {
              width: 306px;
              height: 148px;
              position: absolute;
              top: 0;
              right: 0px;
              z-index: 10;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              justify-content: center;

              .lowest_title {
                width: 100%;
                text-align: start;
                color: #fff;
                font-family: PingFang SC;
                font-size: 20px;
                font-weight: 500;
              }

              .lowest_text {
                width: 100%;
                text-align: start;
                color: #fff;
                font-family: PingFang SC;
                font-size: 14px;
                font-weight: 500;
                opacity: 0.7;
                margin: 5px 0 13px;
              }

              .lowest_btn {
                width: 118px;
                height: 33px;
                line-height: 33px;
                margin-right: 24px;
                text-align: center;
                border-radius: 25px;
                background: linear-gradient(
                  95deg,
                  #8efff7 -7.19%,
                  #84c7f7 100%
                );
                box-shadow: 0px 2px 6px 0px #005b84 inset;
                color: #191919;
                font-family: PingFang SC;
                font-size: 16px;
                font-weight: 600;
              }
            }
          }
        }

        .peak_content_section {
          margin: 17.19px 32px 0px;
          // padding: 0 36px;
          box-sizing: border-box;
          border-radius: 8px;
          background: #f9f9f8;
          box-shadow:
            0px 4px 15px 0px rgba(92, 255, 243, 0.1),
            0px 4px 8px 0px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .peak_content_section_item {
            height: 103px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            div {
              &:first-child {
                color: rgba(99, 96, 96, 0.5);
                font-family: PingFang SC;
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 4px;
              }

              &:last-child {
                color: #000;
                font-family: PingFang SC;
                font-size: 16px;
                font-weight: 500;
              }
            }

            &:hover {
              background: radial-gradient(
                47.32% 47.32% at 50% 50%,
                #c5fcff 0%,
                rgba(245, 245, 245, 0) 100%
              );
            }
          }

          .peak_content_section_item_side {
            width: 1px;
            height: 46px;
            background-color: rgba(190, 210, 217, 1);
          }

          .first_item {
            width: 278px;
          }

          .second_item {
            width: 240px;
          }

          .third_item {
            width: 301px;
          }

          .fourth_item {
            width: 280px;
          }

          .fifth_item {
            width: 205px;
          }

          .peak_content_section_above {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .peak_content_section_line {
            width: calc(100% - 72px);
            height: 0.5px;
            background: #bed2d9;
          }

          .peak_content_section_under {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .more {
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #000;
            font-size: 14px;
            cursor: pointer;
            font-weight: 400;
            border-radius: 0 0 8px 8px;
            background: rgba(255, 255, 255, 0.8);
          }
        }
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 1439px) {
    .lowest_content {
      width: 100%;
      height: 100%;
      background-image: url('../assets/images/home_lowest_background.png');
      background-size: cover;

      .middle_content {
        width: 100%;
        height: 100%;
        background-image: url('../assets/images/home_middle_background.png');
        background-size: cover;

        .peak_content_top {
          //display: flex;
          //align-items: flex-start;
          //justify-content: space-between;
          margin: 0 19px 0 19px;

          .peak_content_top_side_title {
            color: #191919;
            font-size: 16px;
            font-weight: 600;
            padding-top: 70px;
          }

          .peak_content_top_side_search {
            width: 100%;
            height: 50px;
            border-radius: 8px;
            background: #fff;
            margin: 14px 0 0 0;
            padding: 0 6px 0 0;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            .peak_content_top_side_search_type {
              color: #000;
              font-family: PingFang SC;
              font-size: 14px;
              font-weight: 400;
              margin-right: 8px;
            }

            .peak_content_top_side_search_type_icon {
              width: 12px;
              height: 8px;
            }

            input {
              flex: 1;
              margin: 0 22px;
              background-color: transparent;
              border: none;
              outline: none;
              color: #000;
            }

            .peak_content_top_side_search_btn {
              width: 40px;
              height: 40px;
              cursor: pointer;
            }
          }
        }

        .peak_content_top_right {
          width: 474px;
          height: 173px;
          margin-top: 42.47px;
          position: relative;

          .middle_image {
            width: 167.305px;
            height: 151.814px;
            position: absolute;
            bottom: 0px;
            left: 0;
            z-index: 7;
          }

          .lowest_image {
            width: 404px;
            height: 148px;
            border-radius: 12px;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 5;
          }

          .peak_content_top_right_lowest {
            width: 306px;
            height: 148px;
            position: absolute;
            top: 0;
            right: 0px;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;

            .lowest_title {
              width: 100%;
              text-align: start;
              color: #fff;
              font-family: PingFang SC;
              font-size: 20px;
              font-weight: 500;
            }

            .lowest_text {
              width: 100%;
              text-align: start;
              color: #fff;
              font-family: PingFang SC;
              font-size: 14px;
              font-weight: 500;
              opacity: 0.7;
              margin: 5px 0 13px;
            }

            .lowest_btn {
              width: 118px;
              height: 33px;
              line-height: 33px;
              margin-right: 24px;
              text-align: center;
              border-radius: 25px;
              background: linear-gradient(95deg, #8efff7 -7.19%, #84c7f7 100%);
              box-shadow: 0px 2px 6px 0px #005b84 inset;
              color: #191919;
              font-family: PingFang SC;
              font-size: 16px;
              font-weight: 600;
            }
          }
        }

        .peak_content_section {
          margin: 33px 19px 0 19px;
          padding: 21px;
          box-sizing: border-box;
          border-radius: 8px;
          background: #f9f9f8;
          box-shadow:
            0 4px 15px 0 rgba(92, 255, 243, 0.1),
            0 4px 8px 0 rgba(0, 0, 0, 0.04);

          .peak_content_section_above {
            justify-content: space-between;
          }

          .peak_content_section_item {
            display: flex;
            justify-content: space-between;

            div {
              &:first-child {
                color: rgba(99, 96, 96, 0.5);
                font-size: 12px;
                font-weight: 500;
              }

              &:last-child {
                color: #000;
                font-size: 14px;
                font-weight: 500;
              }
            }
          }

          .peak_content_section_line {
            width: 100%;
            height: 0.5px;
            background: #bed2d9;
            opacity: 0.5;
            margin: 11px 0;
          }
        }
      }
    }
  }
</style>
