<script setup lang="ts">
// import { ref } from 'vue';
defineProps<{ viewportWidth: number }>()
// const count = ref(0)
</script>
<template>
    <div class="header_content">
        <div class="lowest_content">
            <div class="middle_content">
                <div class="peak_content">
                    <div class="peak_content_top">
                        <div class="peak_content_top_side">
                            <div class="peak_content_top_side_title">Utility Chain Explorer</div>
                            <div class="peak_content_top_side_search">
                                <div class="peak_content_top_side_search_type">All Filters</div>
                                <img class="peak_content_top_side_search_type_icon"
                                    src="../assets/images/search_to_bottom.png" alt="">
                                <input type="text" name="" id="" placeholder="搜索账户/区块/地址/消息">
                                <img class="peak_content_top_side_search_btn" src="../assets/images/home_search_icon.png"
                                    alt="">
                            </div>
                            <div>
                                <div>Trending search:</div>
                                <ul>
                                    <li>内容1 </li>
                                    <li>内容2</li>
                                    <li>内容3</li>
                                    <li>内容4</li>
                                </ul>
                            </div>
                        </div>
                        <div class="peak_content_top_right"></div>
                    </div>
                    <div class="peak_content_section">

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

            .peak_content {
                width: 100%;
                height: 100%;
                background-image: url('../assets/images/home_peak_background.png');
                background-size: cover;

                .peak_content_top {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-left: 48px;
                    margin-right: 119px;

                    .peak_content_top_side {
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
                            background: #FFF;
                            display: flex;
                            align-items: center;

                            .peak_content_top_side_search_type {
                                color: #000;
                                font-family: PingFang SC;
                                font-size: 14px;
                                font-weight: 400;
                            }

                            .peak_content_top_side_search_type_icon {
                                width: 12px;
                                height: 8px;
                            }

                            input {
                                flex: 1;
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

                    .peak_content_top_right {}
                }

                .peak_content_section {}
            }
        }
    }
}
</style>