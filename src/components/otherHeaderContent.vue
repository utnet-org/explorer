<script setup lang="ts">
  // import { ref } from 'vue';
  // defineProps<{ viewportWidth: number }>()
  // const count = ref(0)
</script>
<template>
  <div class="header_content">
    <div class="lowest_content">
      <div class="middle_content">
        <div class="peak_content">
          <div class="peak_content_top">
            <div class="peak_content_top_side">
              <div class="peak_content_top_side_title">{{
                $t('nav.block')
              }}</div>
              <div class="peak_content_top_side_search">
                <!-- <div class="peak_content_top_side_search_type">All Filters</div> -->
                <!-- <img class="peak_content_top_side_search_type_icon"
                                    src="../assets/images/search_to_bottom.png" alt=""> -->
                <input
                  type="text"
                  name=""
                  id=""
                  :placeholder="$t('home.search')"
                />
                <img
                  class="peak_content_top_side_search_btn"
                  src="../assets/images/home_search_icon.png"
                  alt=""
                />
              </div>
              <!-- <div class="search_history">
                <div>Trending search:</div>
                <div>内容1 </div>
                <div>内容2</div>
                <div>内容3</div>
                <div>内容4</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .header_content {
    width: 100%;
    height: 449px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

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
          margin-left: 32px;

          .peak_content_top_side {
            margin-top: 70px;

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
              margin: 14px 0 9px;
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

            .search_history {
              display: flex;
              align-items: center;
              justify-content: flex-start;

              div {
                margin: 0 10px 0 3px;
                color: #000;
                font-family: PingFang SC;
                font-size: 10px;
                font-weight: 400;
                opacity: 0.5;
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

          .secound_item {
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

  @media (min-width: 320px) and (max-width: 843px) {
    .header_content {
      .lowest_content {
        .middle_content {
          .peak_content {
            .peak_content_top {
              margin: 0 19px 0 19px;

              .peak_content_top_side {
                width: 100%;

                .peak_content_top_side_title {
                  font-size: 16px;
                }

                .peak_content_top_side_search {
                  width: 100%;
                  height: 50px;
                  border-radius: 8px;
                  background: #fff;
                  margin: 14px 0 9px;
                  padding: 0 6px 0 0;
                  box-sizing: border-box;
                  display: flex;
                  align-items: center;

                  input {
                    flex: 1;
                    margin: 0 22px;
                    background-color: transparent;
                    border: none;
                    outline: none;
                    color: #000;
                  }
                }

                .search_history {
                }
              }
            }
          }
        }
      }
    }
  }
</style>
