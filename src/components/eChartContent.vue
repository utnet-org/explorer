<template>
  <div class="my_father">
    <!-- 左 -->
    <div class="computing">
      <div class="month_F">
        <div class="work_m">
          <div class="trend">{{ $t('home.power_trend') }}</div>
          <el-button
            class="custom_buttons"
            size="small"
            color="#3EDFCF"
            type="success"
            :plain="selectedRange !== 'month'"
            :style="{
              color:
                selectedRange === 'month' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
              backgroundColor: selectedRange === 'month' ? '#3EDFCF' : '#fff',
              fontWeight: selectedRange === 'month' ? 500 : 300,
            }"
            @click="setTimeRange('month')"
            >{{ $t('home.month') }}</el-button
          >
          <el-button
            class="custom_buttons"
            color="#3EDFCF"
            type="success"
            size="small"
            :plain="selectedRange !== 'week'"
            :style="{
              color: selectedRange === 'week' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
              backgroundColor: selectedRange === 'week' ? '#3EDFCF' : '#fff',
              fontWeight: selectedRange === 'week' ? 500 : 300,
            }"
            @click="setTimeRange('week')"
            >{{ $t('home.week') }}</el-button
          >
        </div>
        <div @click="goToMore">
          <el-button
            color="#fff"
            class="custom-button"
            :size="viewportWidth > 834 ? 'default' : 'small'"
            >{{ $t('home.see_more') }}</el-button
          >
        </div>
      </div>

      <div ref="chart" style="height: 320px" class="chart_one"></div>
    </div>

    <!-- 右 -->
    <div class="rate_trend">
      <div class="month_F">
        <div class="work_m">{{ $t('home.rate_trend') }}</div>
        <div @click="goToMore1">
          <el-button color="#fff" class="custom-button">{{
            $t('home.see_more')
          }}</el-button>
        </div>
      </div>
      <div ref="basic" class="chart_two" style="height: 360px"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import * as echarts from 'echarts/core';
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    DataZoomComponent,
  } from 'echarts/components';
  import { LineChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import { PosttChartData, PosttgasData } from '@/api/chart';
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
  const selectedRange = ref('month');

  // 函数用于切换数据
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setTimeRange = async (range: string) => {
    selectedRange.value = range;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!chart.value) {
      return;
    }

    myChart = echarts.getInstanceByDom(chart.value);
    const xAxisData = [];
    const seriesData = [];

    if (range === 'week') {
      const res = await PosttChartData({ days: 7, month: 0 });
      for (let i = 0; i < res.data.data.length; i++) {
        xAxisData.push(res.data.data[i].date);
      }
      for (let i = 0; i < res.data.data.length; i++) {
        seriesData.push(res.data.data[i].power);
      }

      // seriesData = res.data.data.power;
    } else {
      const res1 = await PosttChartData({ days: 0, month: 12 });
      for (let i = 0; i < res1.data.data.length; i++) {
        xAxisData.push(res1.data.data[i].date);
      }
      for (let i = 0; i < res1.data.data.length; i++) {
        seriesData.push(res1.data.data[i].power);
      }
    }

    // 图表配置
    const option = {
      grid: {
        containLabel: true, // 确保坐标轴的标签完全显示
        left: 0,
        right: 70,
        top: 15,
        bottom: 20,
      },
      color: ['#04BFDA'],
      tooltip: {
        trigger: 'axis', // 悬浮在数据点上时显示工具提示
        confine: true,

        axisPointer: {
          type: 'none',
        },
        // formatter: "Temperature :  ", // 提示框内容
        backgroundColor: 'option', // 提示框背景颜色
        borderRadius: 8, // 提示框圆角
        borderWidth: 0, // 提示框边框宽度
        padding: 0, // 提示框内边距，单位px，默认各方向内边距为5，
        textStyle: {
          color: '#fff', // 提示框文本颜色
        },

        formatter: function (value: any) {
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
                <div style="color: rgba(25, 25, 25, 0.5);font-size: 10px" ;font-weight: 500>${value[0].axisValue}</div>
               
                <div style="display: flex; justify-content: space-between">
                  <div style="color: #191919; font-size: 12px">全网有效算力：</div>
                  <div style="color: #191919; font-size: 12px; font-weight: 600">${value[0].value} T</div>
                </div>
               
                </div>
          </div>`;
        },
      },
      xAxis: {
        type: 'category', // X轴为类别类型
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
          align: 'center', // 设置标签左对齐
          interval: 0, // 标签间隔为 0，标签全部显示
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: 'rgba(25, 25, 25, 0.5)',
        },
      },
      yAxis: {
        type: 'value', // Y轴是数值类型

        // interval: 10, // 强制刻度的间隔为 10
        splitNumber: 5, // 默认通常是 5

        axisLabel: {
          formatter: '{value} T', // 这里放置你的 Y 轴数据
          interval: 0,
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: 'rgba(25, 25, 25, 1)',
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
            color: '#0AE1EF',
          },
          itemStyle: {
            color: '#3EDFCF',
          },
          type: 'line', // 系列类型是折线图
          smooth: true, // 平滑的线
          showSymbol: false, // 不显示拐点
          symbol: 'circle', // 拐点的形状
          symbolSize: 15, // 拐点大小
          data: seriesData, // 示例数据
          // 区域填充样式
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(10, 225, 239, 0.4)',
              },
              {
                offset: 1,
                color: 'rgba(4, 191, 218, 0)',
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
            grid: {
              containLabel: true, // 确保坐标轴的标签完全显示
              left: 0,
              right: 40,
              top: 15,
              bottom: 20,
            },
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
            grid: {
              containLabel: true, // 确保坐标轴的标签完全显示
              left: 0,
              right: 40,
              top: 15,
              bottom: 20,
            },
            tooltip: {
              formatter: function (value: any) {
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
        ${value[0].axisValue}
      </div>
      
      <div style="display: flex; justify-content: space-between">
        <div style="color: #191919; font-size: 12px">全网有效算力：</div>
        <div style="color: #191919; font-size: 12px; font-weight: 600">
          ${value[0].value} T
        </div>
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
                symbolSize: 17, // 拐点大小
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
              formatter: function (value: any) {
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
  
              <div style="color: rgba(25, 25, 25, 0.5); font-size:8px ;font-weight: 500">${value[0].axisValue}</div>
                
                <div style="display: flex; justify-content: space-between">
                  <div style="color: #191919; font-size: 10px">全网有效算力：</div>
                  <div style="color: #191919; font-size: 10px; font-weight: 600">${value[0].value} T</div>
                </div>
               
              <div style=""></div>
          </div>`;
              },
            },
            series: [
              {
                symbolSize: 10, // 拐点大小
              },
            ],
          },
        },
      ],
    };

    // 设置图表选项
    myChart?.setOption(option);
  };
  const basic = ref(null);
  let myChart1: echarts.ECharts | null | undefined = null;

  const timeData: unknown[] = [];
  const timeDate: unknown[] = [];
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const procedureRateTrend = async () => {
    const res = await PosttgasData();
    for (let i = 0; i < res.data.data.length; i++) {
      timeDate.push(res.data.data[i].date);
    }
    for (let i = 0; i < res.data.data.length; i++) {
      timeData.push(res.data.data[i].gas);
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!basic.value) {
      return;
    }

    myChart1 = echarts.getInstanceByDom(basic.value);
    // 图表配置
    const option = {
      grid: {
        containLabel: true, // 确保坐标轴的标签完全显示
        left: 0,
        right: 35,
        top: 20,
        bottom: 20,
      },
      color: ['#04BFDA'],
      tooltip: {
        trigger: 'axis', // 悬浮在数据点上时显示工具提示

        axisPointer: {
          type: 'none',
        },
        showContent: false, // 不显示 tooltip 内容
      },
      xAxis: {
        type: 'category', // X轴为类别类型
        boundaryGap: false, // 数据点会在边缘开始
        data: timeDate, // 这里放置你的 X 轴数据
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
          align: 'left', // 设置标签左对齐
          interval: 0,
          color: 'rgba(25, 25, 25, 0.5)',
        },
      },
      yAxis: {
        type: 'value', // Y轴是数值类型
        // interval: 10, // 强制刻度的间隔为 10
        splitNumber: 3, // 默认通常是 5

        axisLabel: {
          interval: 0,
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: 'rgba(25, 25, 25, 1)',
          align: 'left', // 设置标签左对齐
          margin: 60, // 调整标签距离Y轴的距离: -10,
          formatter: function (value: number) {
            // 使用 '\n' 换行符来创建两行文本
            return value + 'UNC';
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
            color: '#3EDFCF',
          },
          label: {
            show: true,
            fontWeight: 500, // 加粗文字
            fontSize: 12, // 设置 X 轴标签的文字大小
            color: '#0FACB6',
            position: 'top',
            formatter: function (value: { value: string }) {
              // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
              return value.value + 'UNC';
            },
          },
          type: 'line', // 系列类型是折线图
          lineStyle: {
            width: 1, // 线的宽度
            color: '#0AE1EF',
          },
          smooth: true, // 平滑的线
          showSymbol: false, // 不显示拐点
          symbol: 'circle', // 拐点的形状
          symbolSize: 10, // 拐点大小
          data: timeData, // 示例数据
          // 区域填充样式
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(10, 225, 239, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(4, 191, 218, 0)',
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
    myChart1?.setOption(option);
  };

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (chart.value) {
      myChart = echarts.init(chart.value);
      void setTimeRange('month'); // 默认显示周数据
      window.addEventListener('resize', resizeChart);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (basic.value) {
      myChart1 = echarts.init(basic.value);
      procedureRateTrend();
      window.addEventListener('resize', resizeChart);
    }
  });
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function resizeChart() {
    if (myChart != null) {
      myChart.resize();
    }
    if (myChart1 != null) {
      myChart1.resize();
    }
  }

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart);
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const goToMore = () => {
    // localStorage.setItem('navSelectIndex', '1');
    window.location.reload();
    window.location.href = '/statistics';
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const goToMore1 = () => {
    // localStorage.setItem('navSelectIndex', '1');
    window.location.reload();
    window.location.href = '/statistics/gas';
  };
</script>
<style scoped lang="scss">
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
    box-shadow:
      0px 4px 15px 0px rgba(92, 255, 243, 0.2),
      0px 4px 8px 0px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    background: #f9f9f8;
  }
  .rate_trend {
    border-radius: 8px;
    box-shadow:
      0px 4px 15px 0px rgba(92, 255, 243, 0.2),
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

  @media (min-width: 1025px) {
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

  @media (max-width: 1144px) {
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
