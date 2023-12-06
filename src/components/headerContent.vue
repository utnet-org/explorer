<script setup lang="ts">
  import { getOverviewInfo, OverviewInfo } from '@/api/overview.ts';
  import { onMounted, onUnmounted, reactive, ref } from 'vue';
  import { updateTimeAgo } from '@/utils/time.ts';
  import { getScreenSize, Screen } from '@/utils/screen-size.ts';

  let intervalId: number | undefined;
  defineProps<{ fromPage: string }>();

  const ovData = reactive<OverviewInfo>({});
  const lastTime = ref('');
  const size = getScreenSize().currentScreenSize;

  async function fetchOverviewInfo() {
    const response = await getOverviewInfo();
    Object.assign(ovData, response.data.data);
    lastTime.value = updateTimeAgo(ovData.latestBlock);
  }

  onMounted(() => {
    // 每3秒更新数据
    intervalId = window.setInterval(() => {
      fetchOverviewInfo();
      // timeDifference();
    }, 3000);
  });

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId);
    }
  });
</script>
<template>
  <div class="lowest_content">
    <div class="middle_content">
      <div class="peak_content_top">
        <div class="peak_content_top_side">
          <div class="peak_content_top_side_title">Utility Chain Explorer</div>
          <div class="peak_content_top_side_search">
            <!--                <div class="peak_content_top_side_search_type">All Filters</div>-->
            <!--                <img class="peak_content_top_side_search_type_icon"-->
            <!--                     src="../assets/images/search_to_bottom.png" alt="">-->
            <input
              type="text"
              name=""
              id=""
              placeholder="搜索账户/区块/地址/消息"
            />
            <img
              class="peak_content_top_side_search_btn"
              src="../assets/images/home_search_icon.png"
              alt=""
            />
          </div>
        </div>
        <!--          <div class="peak_content_top_right">-->
        <!--            <img class="middle_image" src="../assets/images/header_middle_image.png" alt="">-->
        <!--            <img class="lowest_image" src="../assets/images/header_lowest_image.png" alt="">-->
        <!--            <div class="peak_content_top_right_lowest">-->
        <!--              <div class="lowest_title">流动性质押</div>-->
        <!--              <div class="lowest_text">The Ultimate Node Management Assistant</div>-->
        <!--              <div class="lowest_btn">立即体验</div>-->
        <!--            </div>-->
        <!--          </div>-->
      </div>
      <div
        v-if="fromPage == 'home' && size !== Screen.Small"
        class="peak_content_section"
      >
        <div class="peak_content_section_above">
          <div class="peak_content_section_item first_item">
            <div>区块高度</div>
            <div>{{ ovData.height }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item second_item">
            <div>最新区块时间</div>
            <div>{{ lastTime }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>全网有效算力</div>
            <div>{{ ovData.totalPower }} TFLOPS</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>活跃算力提供者</div>
            <div>{{ ovData.activeMiner }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>每区块奖励</div>
            <div>{{ ovData.blockReward }} UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_under">
          <div class="peak_content_section_item first_item">
            <div>24h/T算力平均收益</div>
            <div>{{ ovData.blockReward }} UNC/TFLOPS</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item second_item">
            <div>近24h产出量</div>
            <div>{{ ovData.dayProduction }} UNC</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item third_item">
            <div>24h消息数</div>
            <div>{{ ovData.dayMessage }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fourth_item">
            <div>总账户数</div>
            <div>{{ ovData.totalAccount }}</div>
          </div>
          <div class="peak_content_section_item_side"></div>
          <div class="peak_content_section_item fifth_item">
            <div>平均区块间隔</div>
            <div>{{ ovData.aveBlockInterval }} 秒</div>
          </div>
        </div>
      </div>
      <div
        v-if="fromPage == 'home' && size == Screen.Small"
        class="peak_content_section"
      >
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>区块高度</div>
            <div>{{ ovData.height }}</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>最新区块时间</div>
            <div>{{ lastTime }}</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>全网有效算力</div>
            <div>{{ ovData.totalPower }} TFLOPS</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>活跃算力提供者</div>
            <div>{{ ovData.activeMiner }}</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item">
            <div>每区块奖励</div>
            <div>{{ ovData.blockReward }} UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item first_item">
            <div>24h/T算力平均收益</div>
            <div>{{ ovData.blockReward }} UNC/TFLOPS</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item second_item">
            <div>近24h产出量</div>
            <div>{{ ovData.dayProduction }} UNC</div>
          </div>
        </div>
        <div class="peak_content_section_line"></div>
        <div class="peak_content_section_above">
          <div class="peak_content_section_item third_item">
            <div>24h消息数</div>
            <div>{{ ovData.dayMessage }}</div>
          </div>
          <div class="peak_content_section_line"></div>
          <div class="peak_content_section_above">
            <div class="peak_content_section_item fourth_item">
              <div>总账户数</div>
              <div>{{ ovData.totalAccount }}</div>
            </div>
          </div>
          <div class="peak_content_section_line"></div>
          <div class="peak_content_section_above">
            <div class="peak_content_section_item fifth_item">
              <div>平均区块间隔</div>
              <div>{{ ovData.aveBlockInterval }} 秒</div>
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
          padding: 0 36px;
          box-sizing: border-box;
          height: 207px;
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
            width: 100%;
            height: 0.5px;
            background: #bed2d9;
          }

          .peak_content_section_under {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 843px) {
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
