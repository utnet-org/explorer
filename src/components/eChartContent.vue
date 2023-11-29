<template>
  <div class="my_father">
    <!-- 左 -->
    <div class="computing">
      <div class="month_F">
        <div class="work_m">
          <div class="trend">全网算力走势</div>
          <el-button
            class="custom_buttons"
            color="#3EDFCF"
            @click="setTimeRange('week')"
            type="success"
            size="small"
            :plain="selectedRange!=='week'"
            :style="{
              color: selectedRange === 'week' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
              backgroundColor: selectedRange === 'week' ? '#3EDFCF' : '#fff',
              fontWeight: selectedRange === 'week' ? 500 : 300,
            }"
            >周</el-button
          >
          <el-button
            class="custom_buttons"
            size="small"
            color="#3EDFCF"
            @click="setTimeRange('month')"
            type="success"
            :plain="selectedRange!=='month'"
            :style="{
              color:
                selectedRange === 'month' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
              backgroundColor: selectedRange === 'month' ? '#3EDFCF' : '#fff',
              fontWeight: selectedRange === 'month' ? 500 : 300,
            }"
            >月</el-button
          >
        </div>
        <div>
          <el-button
            color="#fff"
            class="custom-button"
            :size="viewportWidth > 834 ? 'default' : 'small'"
            >查看更多</el-button
          >
        </div>
      </div>

      <div ref="chart" style="height: 320px" class="chart_one"></div>
    </div>

    <!-- 右 -->
    <div class="rate_trend">
      <div class="month_F">
        <div class="work_m">24h基础手续费率走势</div>
        <div>
          <el-button color="#fff" class="custom-button">查看更多</el-button>
        </div>
      </div>
      <div ref="basic" class="chart_two" style="height: 360px"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  DataZoomComponent,
} from "echarts/components";
import { LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
defineProps<{ viewportWidth: number }>();
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  DataZoomComponent,
]);

const chart = ref(null);
let myChart: echarts.ECharts | null | undefined = null;
const selectedRange = ref("week");

// 周数据和月数据的示例
const weekData = {
  xAxisData: ["09-20", "09-21", "09-22", "09-23", "09-24", "09-25", "09-26"],
  seriesData: [12, 20, 15, 8, 7, 11, 13],
};

const monthData = {
  xAxisData: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  seriesData: [22, 18, 19, 23, 29, 33, 31, 12, 44, 32, 9, 14],
};

// 切换时间范围并更新图表
// 函数用于切换数据
const setTimeRange = (range: string) => {
  selectedRange.value = range;

  if (!chart.value) {
    return;
  }

  myChart = echarts.getInstanceByDom(chart.value);
  let xAxisData = [];
  let seriesData = [];

  if (range === "week") {
    xAxisData = weekData.xAxisData;
    seriesData = weekData.seriesData;
  } else {
    xAxisData = monthData.xAxisData;
    seriesData = monthData.seriesData;
  }

  // 图表配置
  const option = {
    grid: {
      containLabel: true, // 确保坐标轴的标签完全显示
      left: 0,
      right: 40,
      top: 15,
      bottom: 20,
    },
    color: ["#04BFDA"],
    tooltip: {
      trigger: "axis", // 悬浮在数据点上时显示工具提示
      confine: true,

      axisPointer: {
        type: "none",
      },
      // formatter: "Temperature :  ", // 提示框内容
      backgroundColor: "option", // 提示框背景颜色
      borderRadius: 8, // 提示框圆角
      borderWidth: 0, // 提示框边框宽度
      padding: 0, // 提示框内边距，单位px，默认各方向内边距为5，
      textStyle: {
        color: "#fff", // 提示框文本颜色
      },

      formatter: function () {
        return `
          <div style="
              width: 232px;
              height: 98px;
              padding: 11px;
              overflow: hidden;
              border : 1px solid #3EDFCF;
              background-color:rgba(217, 217, 217, 0.7);
              backdrop-filter: blur(2px);
              border-radius: 8px;">
              <div style="z-index:1000">
                <div style="color: rgba(25, 25, 25, 0.5);font-size: 10px" ;font-weight: 500>星期四 27/09/2023</div>
                <div style="display: flex; justify-content: space-between ; margin-top:13px ">
                   <div style="color: #191919; font-size: 12px">当日算力新增：</div>
                   <div style="color: #191919; font-size: 12px; font-weight: 600">21,21 TFLOPS</div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div style="color: #191919; font-size: 12px">全网有效算力：</div>
                  <div style="color: #191919; font-size: 12px; font-weight: 600">123K TFLOPS</div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div style="color: #191919; font-size: 12px">当日平均服务收益：</div>
                  <div style="color: #191919; font-size: 12px; font-weight: 600">0.015 UNC/TFLOPS</div>
                </div>
                </div>
          </div>`;
      },
    },
    xAxis: {
      type: "category", // X轴为类别类型
      boundaryGap: false, // 数据点会在边缘开始
      data: xAxisData, // 这里放置你的 X 轴数据

      axisLine: {
        show: false, // 不显示轴线
        onZero: true, // X 轴的线会与 Y 轴的 0 刻度线对齐
      },
      axisTick: {
        show: false, // 不显示轴上的刻度
        alignWithLabel: true, // 使刻度线和标签对齐
      },

      axisLabel: {
        align: "left", // 设置标签左对齐
        interval: 0,
        fontWeight: 500, // 加粗文字
        fontSize: 12, // 设置 X 轴标签的文字大小
        color: "rgba(25, 25, 25, 0.5)",
      },
    },
    yAxis: {
      type: "value", // Y轴是数值类型

      // interval: 10, // 强制刻度的间隔为 10
      splitNumber: 5, // 默认通常是 5

      axisLabel: {
        formatter: "{value}K TFLOPS", // 这里放置你的 Y 轴数据
        interval: 0,
        fontWeight: 500, // 加粗文字
        fontSize: 12, // 设置 X 轴标签的文字大小
        color: "rgba(25, 25, 25, 1)",
      },
      axisLine: {
        show: false, // 不显示轴线
      },
      splitLine: {
        show: false, // 显示网格线
      },
    },
    series: [
      {
        lineStyle: {
          width: 1, // 线的宽度
          color: "#0AE1EF",
        },
        itemStyle: {
          color: "#3EDFCF",
        },
        type: "line", // 系列类型是折线图
        smooth: true, // 平滑的线
        showSymbol: false, // 不显示拐点
        symbol: "circle", //拐点的形状
        symbolSize: 20, //拐点大小
        data: seriesData, // 示例数据
        // 区域填充样式
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(10, 225, 239, 0.4)",
            },
            {
              offset: 1,
              color: "rgba(4, 191, 218, 0)",
            },
          ]),
        },
      },
    ],
    media: [
      {
        query: {
          minWidth: 808,
        },
        option: {
          xAxis: {
            axisLabel: {
              fontSize: 12, // 设置 X 轴标签的文字大小
              fontWeight: 500, // 加粗文字
            },
          },
          yAxis: {
            axisLabel: {
              fontSize: 12, // 设置 X 轴标签的文字大小
              fontWeight: 500, // 加粗文字
            },
          },
        },
      },
      {
        query: {
          maxWidth: 807, // 小于等于 834px
          minWidth: 393,
        },
        option: {
          tooltip: {
            formatter: function () {
              return `
          
  <div
    style="
      width: 232px;
      height: 98px;
      padding: 11px;
      border: 1px solid #3edfcf;
      background-color: rgba(217, 217, 217, 0.7);
      backdrop-filter: blur(2px);
      border-radius: 8px;
      position: relative;
     
    "
  >
    <div style="z-index: 1000">
      <div
        style="color: rgba(25, 25, 25, 0.5); font-size: 10px; font-weight: 500"
      >
        星期四 27/09/2023
      </div>
      <div
        style="display: flex; justify-content: space-between; margin-top: 13px"
      >
        <div style="color: #191919; font-size: 12px">当日算力新增：</div>
        <div style="color: #191919; font-size: 12px; font-weight: 600">
          21,21 TFLOPS
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div style="color: #191919; font-size: 12px">全网有效算力：</div>
        <div style="color: #191919; font-size: 12px; font-weight: 600">
          123K TFLOPS
        </div>
      </div>
      <div style="display: flex; justify-content: space-between">
        <div style="color: #191919; font-size: 12px">当日平均服务收益：</div>
        <div style="color: #191919; font-size: 12px; font-weight: 600">
          0.015 UNC/TFLOPS
        </div>
      </div>
    </div>
 
  </div>
          
          `;
            },
          },
          xAxis: {
            axisLabel: {
              fontSize: 12, // 设置 X 轴标签的文字大小
            },
          },
          yAxis: {
            axisLabel: {
              fontSize: 12, // 设置 X 轴标签的文字大小
            },
          },
          series: [
            {
              symbolSize: 17, //拐点大小
              label: {
                show: false, // 显示标签
                fontWeight: 500, // 加粗文字
                fontSize: 12, // 设置 X 轴标签的文字大小
              },
            },
          ],
        },
      },
      {
        query: {
          maxWidth: 392,
        },
        option: {
          xAxis: {
            axisLabel: {
              fontSize: 8, // 设置 X 轴标签的文字大小
            },
          },
          yAxis: {
            axisLabel: {
              fontSize: 8, // 设置 X 轴标签的文字大小
            },
          },
          tooltip: {
            formatter: function () {
              return `
          <div style="
              width: 199px;
              height: 96px;
              overflow: hidden;
              padding-left: 11px;
              padding-right: 11px;
              border : 1px solid #3EDFCF;
            background-color:rgba(217, 217, 217, 0.7);
              backdrop-filter: blur(2px);
              border-radius: 8px;">
  
              <div style="color: rgba(25, 25, 25, 0.5); font-size:8px ;font-weight: 500">星期四 27/09/2023</div>
                <div style="display: flex; justify-content: space-between">
                   <div style="color: #191919; font-size: 10px">当日算力新增：</div>
                   <div style="color: #191919; font-size: 10px; font-weight: 600">21,21 TFLOPS</div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div style="color: #191919; font-size: 10px">全网有效算力：</div>
                  <div style="color: #191919; font-size: 10px; font-weight: 600">123K TFLOPS</div>
                </div>
                <div style="display: flex; justify-content: space-between">
                  <div style="color: #191919; font-size: 10px">当日平均服务收益：</div>
                  <div style="color: #191919; font-size: 10px; font-weight: 600">0.015 UNC/TFLOPS</div>
                </div>
              <div style=""></div>
          </div>`;
            },
          },
          series: [
            {
              symbolSize: 10, //拐点大小
            },
          ],
        },
      },
    ],
  };

  // 设置图表选项
  myChart!.setOption(option);
};
const basic = ref(null);
let myChart1: echarts.ECharts | null | undefined = null;
const timeData = {
  xAxisData: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
  seriesData: [0.1, 0.2, 0.15, 0.3, 0.25, 0.35, 0.3],
};
const procedureRateTrend = () => {
  if (!basic.value) {
    return;
  }

  myChart1 = echarts.getInstanceByDom(basic.value);
  // 图表配置
  const option = {
    grid: {
      containLabel: true, // 确保坐标轴的标签完全显示
      left: -30,
      right: 35,
      top: 15,
      bottom: 20,
    },
    color: ["#04BFDA"],
    tooltip: {
      trigger: "axis", // 悬浮在数据点上时显示工具提示

      axisPointer: {
        type: "none",
      },
      showContent: false, // 不显示 tooltip 内容
    },
    xAxis: {
      type: "category", // X轴为类别类型
      boundaryGap: false, // 数据点会在边缘开始
      data: timeData.xAxisData, // 这里放置你的 X 轴数据
      axisLine: {
        show: false, // 不显示轴线
        onZero: true, // X 轴的线会与 Y 轴的 0 刻度线对齐
      },
      axisTick: {
        show: false, // 不显示轴上的刻度
        alignWithLabel: true, // 使刻度线和标签对齐
      },

      axisLabel: {
        fontWeight: 500, // 加粗文字
        fontSize: 12, // 设置 X 轴标签的文字大小
        margin: 30,
        align: "left", // 设置标签左对齐
        interval: 0,
        color: "rgba(25, 25, 25, 0.5)",
      },
    },
    yAxis: {
      type: "value", // Y轴是数值类型
      // interval: 10, // 强制刻度的间隔为 10
      splitNumber: 3, // 默认通常是 5

      axisLabel: {
        interval: 0,
        fontWeight: 500, // 加粗文字
        fontSize: 12, // 设置 X 轴标签的文字大小
        color: "rgba(25, 25, 25, 1)",
        align: "left", // 设置标签左对齐
        margin: 60, // 调整标签距离Y轴的距离: -10,
        formatter: function (value: number) {
          // 使用 '\n' 换行符来创建两行文本
          return value + "\nnanoUNC";
        },
      },
      axisLine: {
        show: false, // 不显示轴线
      },
      splitLine: {
        show: false, // 显示网格线
      },
    },
    // 数据缩放组件
    // dataZoom: [
    //   {
    //     type: "inside", // 内置在图表中的数据区域缩放组件
    //     start: 0, // 数据窗口范围的起始百分比
    //     end: 100, // 数据窗口范围的结束百分比
    //   },
    // ],
    series: [
      {
        itemStyle: {
          color: "#3EDFCF",
        },
        label: {
          show: true,
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: "#0FACB6",
          position: "top",
          formatter: function () {
            return "0.142 nanoUNC";
          },
        },
        type: "line", // 系列类型是折线图
        lineStyle: {
          width: 1, // 线的宽度
          color: "#0AE1EF",
        },
        smooth: true, // 平滑的线
        showSymbol: false, // 不显示拐点
        symbol: "circle", //拐点的形状
        symbolSize: 10, //拐点大小
        data: timeData.seriesData, // 示例数据
        // 区域填充样式
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(10, 225, 239, 0.5)",
            },
            {
              offset: 1,
              color: "rgba(4, 191, 218, 0)",
            },
          ]),
        },
      },
    ],
    media: [
      {
        query: {
          maxWidth: 807, // 小于等于 834px
          minWidth: 393,
        },
        option: {},
      },
      {
        query: {
          maxWidth: 393,
        },
        option: {
          xAxis: {
            axisLabel: {
              fontSize: 8, // 设置 X 轴标签的文字大小
            },
          },
          yAxis: {
            axisLabel: {
              interval: 0,
              fontSize: 8, // 设置 X 轴标签的文字大小
            },
          },
          series: [
            {
              label: {
                fontSize: 10, // 设置 X 轴标签的文字大小
              },
            },
          ],
        },
      },
    ],
  };
  // 设置图表选项
  myChart1!.setOption(option);
};

onMounted(() => {
  if (chart.value) {
    myChart = echarts.init(chart.value);
    setTimeRange("week"); // 默认显示周数据
    window.addEventListener("resize", resizeChart);
  }
  if (basic.value) {
    myChart1 = echarts.init(basic.value);
    procedureRateTrend();
    window.addEventListener("resize", resizeChart);
  }
});
function resizeChart() {
  if (myChart) {
    myChart.resize();
  }
  if (myChart1) {
    myChart1.resize();
  }
}

onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
});
</script>
<style scoped lang="scss">
//.my_father {
//  margin: 15px 0px;
//}
.custom_buttons:hover {
  background-color: #3edfcf !important;
}

.custom-button {
  font-weight: 500;
  background-color: #fff;
  color: #191919; /* 默认颜色 */
  border-color: #fff; /* 如果需要，还可以设置边框颜色 */
}

.custom-button:hover {
  background-color: #cedddb; /* 鼠标悬停或聚焦时的颜色 */
}
.computing {
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  background: #f9f9f8;
}
.rate_trend {
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  background: #f9f9f8;
}

.month_F {
  margin: 0 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 55px;
  border-bottom: 1px solid #bed2d9;
}
.work_m {
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 500;
  color: #191919;
}

@media (min-width: 1440px) {
  .trend {
    margin-right: 19px;
  }
  .my_father {
    display: flex;
    justify-content: space-between;
    height: 380px;
    margin: 24px 32px;
  }
  .chart_one {
    margin: 8px 33px 0 26px;
    padding-bottom: 6px;
  }
  .chart_two {
    margin: 4px 36px 0 10px;
    padding-bottom: 6px;
  }
  .computing {
    flex: 2;
    margin-right: 18px;
    width: 100%;
    height: 380px;
  }

  .rate_trend {
    flex: 1;
    width: 100%;
    height: 380px;
  }
  .custom_buttons,
  .custom-button {
    font-size: 14px;
  }

  .work_m {
    font-size: 16px;
  }
}
@media (min-width: 834px) and (max-width: 1439px) {
  .trend {
    margin-right: 13px;
  }
  .my_father {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 14px;
  }

  .chart_one {
    margin: 25px 22px 0px 23px;
  }
  .chart_two {
    margin: 0px 22px 0 19px;
  }
  .computing {
    margin-left: 14px;
    margin-right: 13px;
    width: 100%;
    height: 380px;
    margin-bottom: 16px;
  }

  .rate_trend {
    width: 100%;
    height: 380px;
    margin-left: 14px;
    margin-right: 13px;
  }
  .work_m {
    font-size: 14px;
  }

  .custom-button {
    font-size: 12px;
    font-weight: 400;
  }
}
@media (max-width: 833px) {
  .trend {
    margin-right: 9px;
  }
  .my_father {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 16px 21px;
  }
  .chart_one {
    margin: 20px 10px 0 9px;
    padding-bottom: 6px;
  }
  .chart_two {
    margin: 0 10px 0 9px;
    padding-bottom: 6px;
  }
  .computing {
    width: 100%;
    height: 337px;
    margin-bottom: 16px;
  }

  .rate_trend {
    width: 100%;
    height: 337px;
  }
  .work_m {
    font-size: 12px;
  }
  .custom-button {
    font-size: 12px;
    font-weight: 400;
    margin-left: 8px;
  }
}
</style>
