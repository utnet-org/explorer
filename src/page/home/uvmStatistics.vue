<script setup lang="ts">
import HeaderPage from "../../components/otherHeaderContent.vue";
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
import { ElTable, ElTableColumn, ElPagination } from "element-plus";
import { getScreenSize, Screen } from "@/utils/screen-size.ts";
import button_arrow from "@/assets/svgs/button_arrow.svg";

const windowWidth = ref(document.documentElement.clientWidth);

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

// ^第一个图表的 DOM 引用
const chart = ref(null);
// ^第一个图表的实例
let myChart: echarts.ECharts | null | undefined = null;
// ^时间范围
const selectedRange = ref("week");

// ^基础费率走势 周数据和月数据的示例
const weekData = {
  xAxisData: ["09-20", "09-21", "09-22", "09-23", "09-24", "09-25", "09-26"],
  seriesData: [12, 20, 15, 8, 27, 11, 13],
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

// ^切换时间范围并更新图表
// ^函数用于切换数据
const setTimeRange = (range: string) => {
  // ^更新时间范围(week/month)
  selectedRange.value = range;
  if (!chart.value) {
    return;
  }

  // ^获取图表实例
  myChart = echarts.getInstanceByDom(chart.value);
  // ^x轴数据和系列数据
  let xAxisData = [];
  let seriesData = [];

  // ^根据时间范围选择数据
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
      confine: true, // 将提示框限制在图表的区域内

      axisPointer: {
        type: "line", // 显示一条竖线作为指示器
        lineStyle: {
          // 在这里自定义竖线的样式
          color: "#42E8E0", // 线的颜色
          width: 2, // 线的宽度
          type: "solid", // 线的类型，例如 'solid', 'dashed', 或 'dotted'
        },
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
      splitNumber: 3, // 默认通常是 5
      axisLabel: {
        margin: 50,
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
        symbolSize: -1, //拐点大小
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
          maxWidth: 1025,
        },
        option: {
          grid: {
            containLabel: true, // 确保坐标轴的标签完全显示
            left: -20,
            right: 30,
            top: 15,
            bottom: 20,
          },
          xAxis: {
            axisLabel: {
              fontSize: 8, // 设置 X 轴标签的文字大小
            },
          },
          yAxis: {
            axisLabel: {
              align: "left", // 设置标签左对齐
              fontSize: 8, // 设置 X 轴标签的文字大小
              formatter: function (value: number) {
                // 使用 '\n' 换行符来创建两行文本
                return value + "\nTFLOPS";
              },
            },
          },
          tooltip: {
            trigger: "axis", // 悬浮在数据点上时显示工具提示
            confine: true, // 将提示框限制在图表的区域内

            axisPointer: {
              type: "none", // 显示一条竖线作为指示器
            },
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
              emphasis: {
                focus: "series",
                lineStyle: {
                  width: 2, // 高亮时的线宽
                },
                itemStyle: {
                  color: "#42E8E0", // 高亮时的拐点颜色

                  symbolSize: 30, // 高亮时的拐点大小
                },
              },
            },
            {
              symbolSize: 10, //拐点大小
              emphasis: {
                focus: "series",
                lineStyle: {
                  width: 2, // 高亮时的线宽
                },
                itemStyle: {
                  color: "#42E8E0", // 高亮时的拐点颜色
                },

                symbolSize: 10, // 高亮时的拐点大小
              },
            },
          ],
        },
      },
    ],
  };

  // 设置图表选项
  myChart!.setOption(option);
};

onMounted(() => {
  if (chart.value) {
    //初始化第一个图表
    myChart = echarts.init(chart.value);
    setTimeRange("week"); // 默认显示周数据

    // 监听窗口大小变化，重新绘制图表
    window.addEventListener("resize", resizeChart);
  }

  //~监听窗口大小变化
  window.addEventListener("resize", () => {
    //获取到当前窗口的宽度
    windowWidth.value = document.documentElement.clientWidth;
    console.log(windowWidth.value);
  });
});
// ~重新绘制图表
function resizeChart() {
  if (myChart) {
    // ~调用图表实例的 resize 方法
    myChart.resize();
  }
}

onUnmounted(() => {
  // ~移除监听
  window.removeEventListener("resize", resizeChart);
});

// 定义可选的时间类型数组
const ecologyTimeTypeList = ["24小时", "周", "月", "年"];
const checkEcologyTimeType = ref("24小时"); // 当前选中的时间类型
const changeTimeType = (item: string) => {
  // 改变时间类型的方法
  checkEcologyTimeType.value = item;
};

const size = getScreenSize().currentScreenSize; // 获取当前屏幕尺寸

const Data = ref([
  {
    MessageType: "ExtendSectorExpiration1",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration2",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 36.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration3",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration4",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 46.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration5",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration6",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration6",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration7",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration8",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
  {
    MessageType: "ExtendSectorExpiration9",
    GasPremium: "0.40 nano UNC",
    AverageGaslimit: "1,182,151,999",
    AverageGasConsumption: "915,020,158",
    AverageCommission: "0.0007 UNC",
    TotalFeeOrPercentage: "183.994447 UNC",
    TotalFeeOrPercentageNum: 66.71,
    MessagesOrProportion: "703",
    MessagesOrProportionNum: 0.17,
  },
]);
const tableData = ref([...Data.value, ...Data.value]);

const currentPage = ref(1); // 当前页码
const pageSize = ref(5); // 每页显示条目数，您想要显示5个
const totalItems = ref(tableData.value.length); // 总条目数，即您数组的长度
// 处理页码改变
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 控制按钮显示隐藏的响应式变量
const showButton = ref(false);

// 页面滚动事件处理函数
function handleScroll() {
  // 当页面滚动超过 600px 时显示按钮
  showButton.value = window.scrollY > 600;
}

// 滚动到页面顶部的函数
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 平滑滚动
  });
}

onMounted(() => {
  // 添加滚动监听
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  // 移除滚动监听
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="statistics">
    <HeaderPage :viewportWidth="windowWidth" />
    <div style="height: 306px"></div>
    <div class="echartAll">
      <div class="computing_power_trend">
        <div class="month_F">
          <div class="trend">基础费率走势</div>
          <div
            style="
              width: 100%;
              display: flex;
              justify-content: space-between;
              flex: 8;
            "
          >
            <div class="work_m">
              <el-button
                class="custom_buttons"
                color="#3EDFCF"
                @click="setTimeRange('week')"
                type="success"
                size="small"
                :plain="selectedRange !== 'week'"
                :style="{
                  color:
                    selectedRange === 'week' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange === 'week' ? '#3EDFCF' : '#fff',
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
                :plain="selectedRange !== 'month'"
                :style="{
                  color:
                    selectedRange === 'month' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange === 'month' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange === 'month' ? 500 : 300,
                }"
                >月</el-button
              >
            </div>

            <el-button
              color="#cedddb"
              class="custom-button"
              :size="viewportWidth > 834 ? 'default' : 'small'"
              >查看更多</el-button
            >
          </div>
        </div>

        <div ref="chart" style="height: 320px" class="chart_one"></div>
      </div>
    </div>

    <div>
      <div class="tabulation">
        <div class="ecology_header">
          <div class="ecology_title">生态导览</div>
          <div class="ecology_time">
            <el-button
              size="small"
              :color="checkEcologyTimeType == timeItem ? '#3EDFCF' : ''"
              @click="changeTimeType(timeItem)"
              :style="{
                fontWeight: checkEcologyTimeType == timeItem ? '500' : '300',
                fontSize: '14px',
                border: '0.5px solid #3EDFCF',
                borderRadius: '2px',
              }"
              v-for="(timeItem, timeIndex) in ecologyTimeTypeList"
              :key="timeIndex"
              >{{ timeItem }}
            </el-button>
          </div>
        </div>
        <div v-if="size !== Screen.Small">
          <div class="ecology_table">
            <el-table
              :data="
                tableData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              table-layout="fixed"
              :header-cell-style="{
                textAlign: 'center',
                color: 'rgba(0,0,0,0.5)',
                fontSize: '12px',
                fontWeight: '300',
                borderBottom: 'none',
                backgroundColor: '#F9F9F8',
              }"
              :cell-style="{
                color: '#000',
                height: '36px',
                fontSize: '14px',
                fontWeight: '500',
                textAlign: 'center',
                borderBottom: '0.5px solid rgba(140, 233, 220,0.5)',
                backgroundColor: '#F9F9F8',
              }"
            >
              <el-table-column prop="MessageType" label="消息类型" />
              <el-table-column prop="GasPremium" label="Gas Premium" />
              <el-table-column prop="AverageGaslimit" label="平均Gas限额">
              </el-table-column>
              <el-table-column label="平均Gas消耗" prop="AverageGasConsumption">
              </el-table-column>
              <el-table-column label="平均手续费" prop="AverageCommission">
              </el-table-column>
              <el-table-column label="手续费合计/占比">
                <template #default="scope">
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <div>{{ scope.row.TotalFeeOrPercentage }}</div>
                    <div style="margin-left: 7px">
                      <div
                        v-if="scope.row.TotalFeeOrPercentageNum > 50"
                        style="color: #0facb6"
                      >
                        {{ scope.row.TotalFeeOrPercentageNum }}%
                      </div>
                      <div
                        v-else-if="scope.row.TotalFeeOrPercentageNum <= 50"
                        style="color: palevioletred"
                      >
                        {{ scope.row.TotalFeeOrPercentageNum }}%
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="消息数合计/占比">
                <template #default="scope">
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <div>{{ scope.row.MessagesOrProportion }}</div>
                    <div style="margin-left: 7px">
                      <div
                        v-if="scope.row.MessagesOrProportionNum > 0"
                        style="color: #0facb6"
                      >
                        {{ scope.row.MessagesOrProportionNum }}%
                      </div>
                      <div
                        v-else-if="scope.row.MessagesOrProportionNum <= 0"
                        style="color: palevioletred"
                      >
                        {{ scope.row.MessagesOrProportionNum }}%
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-else-if="size === Screen.Small">
          <div v-for="(item, index) in tableData" :key="index">
            <div class="eco-rank-item">
              <!--          <div class="black-text-14">{{ item.rank }}</div>-->
              <div class="MessageType">{{ item.MessageType }}</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">Gas Premium</div>
              <div class="black-text-14-500">{{ item.GasPremium }}</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">平均Gas限额</div>
              <div class="black-text-14-500">{{ item.AverageGaslimit }}</div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">平均Gas消耗</div>
              <div class="black-text-14-500">
                {{ item.AverageGasConsumption }}
              </div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">平均手续费</div>
              <div class="black-text-14-500">
                {{ item.AverageCommission }}
              </div>
            </div>

            <div class="eco-item">
              <div class="grey-text-12-300">手续费合计/占比</div>
              <div class="eco-merge-value">
                <div class="black-text-14-500">
                  &nbsp;{{ item.TotalFeeOrPercentage }}&nbsp;
                </div>
                <div
                  v-if="item.TotalFeeOrPercentageNum! > 0"
                  class="second-text-12-500"
                >
                  {{ item.TotalFeeOrPercentageNum }}%
                </div>
                <div
                  v-else-if="item.TotalFeeOrPercentageNum! <= 0"
                  class="minus-text-12-500"
                >
                  {{ item.TotalFeeOrPercentageNum }}%
                </div>
              </div>
            </div>
            <div class="eco-item">
              <div class="grey-text-12-300">消息数合计/占比</div>
              <div class="eco-merge-value">
                <div class="black-text-14-500">
                  {{ item.MessagesOrProportion }}&nbsp;&nbsp;
                </div>
                <div
                  v-if="item.MessagesOrProportionNum! > 0"
                  class="second-text-12-500"
                >
                  {{ item.MessagesOrProportionNum }}%
                </div>
                <div
                  v-else-if="item.MessagesOrProportionNum! <= 0"
                  class="minus-text-12-500"
                >
                  {{ item.MessagesOrProportionNum }}%
                </div>
              </div>
            </div>
            <!--        最后一条数据去除分隔线-->
            <div v-if="index !== tableData.length - 1" class="eco-line"></div>
          </div>
        </div>
      </div>
      <div v-if="size !== Screen.Small">
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next, jumper"
            :total="totalItems"
            :page-size="pageSize"
            @current-change="handlePageChange"
            prev-icon="CaretLeft"
            next-icon="CaretRight"
          >
          </el-pagination>
        </div>
        <div class="button_arrow" v-show="showButton" @click="scrollToTop">
          <button_arrow />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.button_arrow {
  position: absolute;
  right: 38px;
  bottom: 0px;
  width: 55px;
  height: 55px;
  flex-shrink: 0;
}
.pagination {
  position: relative;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 60px;
  .el-pagination {
    --el-pagination-bg-color: transparent;
    --el-pagination-hover-color: none;
  }
  :deep(.el-pagination button.is-disabled),
  :deep(.el-pagination button:disabled) {
    background-color: transparent !important;
  }

  :deep(.el-pager li.is-active) {
    color: #191919;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: default;
    background-color: #3edfcf;
    border-radius: 50%;
    box-shadow: 0 0px 5px 6px rgba(62, 223, 207);
  }
  :deep(.el-pager li) {
    min-width: 24px;
  }
  :deep(li.number) {
    padding: 0;
    margin: 10px;
    width: 23px;
    height: 23px;
  }
  //设置最左边的按钮
  :deep(.btn-prev) {
    width: 40px;
    height: 40px;
    color: #000;
    .el-icon {
      font-size: 20px;
    }
  }

  //设置最右边的按钮
  :deep(.btn-next) {
    width: 40px;
    height: 40px;
    color: #000;
    .el-icon {
      font-size: 20px;
    }
  }

  /* 使用深度选择器定位分页器的输入框 */
  //  .el-input--default .el-pagination__editor .is-in-pagination
  :deep(.el-input) {
    width: 81px !important;
  }
  :deep(.el-pagination .el-input__wrapper) {
    width: 81px !important;
    height: 17px;
    border-radius: 31px;
    border: 0.5px solid #3edfcf;
    background: var#fff;
  }
}
.statistics {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #f2f0ea;
}
.echartAll {
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 70px;
}

.custom_buttons:hover {
  background-color: #3edfcf !important;
}

.custom-button {
  font-weight: 500;
  background-color: #fff;
  color: #191919; /* 默认颜色 */
  border-color: #fff; /* 如果需要，还可以设置边框颜色 */
}

.computing_power_trend {
  border-radius: 8px;
  box-shadow: 0px 4px 15px 0px rgba(92, 255, 243, 0.2),
    0px 4px 8px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  background: #f9f9f8;
}

.month_F {
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

@media (min-width: 1025px) {
  .trend {
    color: #000;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: 19px;
  }

  .computing_power_trend {
    height: 380px;
    width: 90%;
    padding: 0 64px;
  }

  .custom_buttons,
  .custom-button {
    font-size: 14px;
  }

  .work_m {
    font-size: 16px;
  }

  .tabulation {
    // height: 393px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow: 0 4px 15px 0 rgba(92, 255, 243, 0.1),
      0 4px 8px 0 rgba(0, 0, 0, 0.04);
    margin: 32px 32px;
    margin-bottom: 60px;

    .ecology_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 22px;
      padding: 19px 0 12px;
      border-bottom: 0.5px solid rgba(140, 233, 220, 0.5);

      .ecology_title {
        color: #000;
        font-family: $primary-font-family;
        font-size: 16px;
        font-weight: 500;
      }

      .ecology_time {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }

    .ecology_table {
      width: 100%;
      padding: 0 22px 22px 22px;
      box-sizing: border-box;
    }
  }
}

@media (max-width: 1024px) {
  .trend {
    color: #000;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-right: 9px;
  }
  .echartAll {
    padding: 0 18px;
  }
  .computing_power_trend {
    width: 100%;
    padding: 0 9px;
    height: 337px;
    margin-bottom: 16px;
  }

  .work_m {
    font-size: 12px;
  }
  .custom-button {
    font-size: 12px;
    font-weight: 400;
    margin-left: 8px;
  }

  .MessageType {
    width: 100%;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
  .tabulation {
    // height: 393px;
    border-radius: 8px;
    background: #f9f9f8;
    box-shadow: 0 4px 15px 0 rgba(92, 255, 243, 0.1),
      0 4px 8px 0 rgba(0, 0, 0, 0.04);
    margin: 16px 21px;

    .ecology_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 22px;
      padding: 19px 0 12px;
      border-bottom: 0.5px solid rgba(140, 233, 220, 0.5);

      .ecology_title {
        color: #000;
        font-family: $primary-font-family;
        font-size: 16px;
        font-weight: 500;
      }

      .ecology_time {
        display: flex;
        align-items: center;
        justify-content: end;
      }
    }

    .ecology_table {
      width: 100%;
      padding: 0 22px;
      box-sizing: border-box;
    }
  }
}
</style>
