<script setup lang="ts">
  //  算力服务图表
  import HeaderPage from '../../components/otherHeaderContent.vue';
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
import { PosttChartData } from '@/api/chart';

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
  const chart1 = ref(null);
  const chart2 = ref(null);
  // ^第一个图表的实例
  let myChart: echarts.ECharts | null | undefined = null;
  let myChart1: echarts.ECharts | null | undefined = null;
  let myChart2: echarts.ECharts | null | undefined = null;

  // ^时间范围
  const selectedRange = ref('week');
  const selectedRange1 = ref('week');
  const selectedRange2 = ref('week');

  // ^全网算力走势 周数据和月数据的示例
  // ~ 头部矿工算力增量走势
  const weekData1 = {
    xAxisData: ['09-20', '09-21', '09-22', '09-23', '09-24', '09-25', '09-26'],
    seriesData: [
      [120, 210, 315, 208, 327, 391, 300],
      [302, 102, 400, 102, 248, 345, 201],
      [102, 207, 384, 156, 279, 365, 321],
    ],
  };
  const monthData1 = {
    xAxisData: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    seriesData: [
      [222, 318, 319, 213, 298, 303, 341, 122, 344, 362, 399, 194],
      [152, 220, 215, 388, 278, 181, 193, 241, 244, 212, 219, 318],
      [132, 341, 233, 265, 321, 335, 135, 176, 374, 237, 135, 387],
    ],
  };
  //* 算力提供者服务收益变化(UNC/T)
  const weekData2 = {
    xAxisData: ['09-20', '09-21', '09-22', '09-23', '09-24', '09-25', '09-26'],
    seriesData: [[1, 3, 5, 2, 3, 1, 5]],
  };
  const monthData2 = {
    xAxisData: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    seriesData: [[2, 3, 1, 3, 5, 3, 1, 2, 4, 3, 5, 4]],
  };

  // ^切换时间范围并更新图表
  // ^函数用于切换数据
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setTimeRange = async (range: string) => {
    // ^更新时间范围(week/month)
    selectedRange.value = range;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!chart.value) {
      return;
    }

    // ^获取图表实例
    myChart = echarts.getInstanceByDom(chart.value);
    // ^x轴数据和系列数据
    const xAxisData = [];
    const seriesData = [];

    // ^根据时间范围选择数据
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
        right: 90,
        top: 15,
        bottom: 20,
      },
      color: ['#04BFDA'],
      tooltip: {
        trigger: 'axis', // 悬浮在数据点上时显示工具提示
        confine: true, // 将提示框限制在图表的区域内

        axisPointer: {
          type: 'line', // 显示一条竖线作为指示器
          lineStyle: {
            // 在这里自定义竖线的样式
            color: '#42E8E0', // 线的颜色
            width: 2, // 线的宽度
            type: 'solid', // 线的类型，例如 'solid', 'dashed', 或 'dotted'
          },
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
          align: 'left', // 设置标签左对齐
          interval: 0,
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: 'rgba(25, 25, 25, 0.5)',
        },
      },
      yAxis: {
        type: 'value', // Y轴是数值类型
        splitNumber: 3, // 默认通常是 5
        axisLabel: {
          margin: 50,
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
          symbolSize: -1, // 拐点大小
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
                align: 'left', // 设置标签左对齐
                fontSize: 8, // 设置 X 轴标签的文字大小
                formatter: function (value: number) {
                  // 使用 '\n' 换行符来创建两行文本
                  return value + '\nTFLOPS';
                },
              },
            },
            tooltip: {
              trigger: 'axis', // 悬浮在数据点上时显示工具提示
              confine: true, // 将提示框限制在图表的区域内

              axisPointer: {
                type: 'none', // 显示一条竖线作为指示器
              },
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
            series: [
              {
                symbolSize: 10, // 拐点大小
                emphasis: {
                  focus: 'series',
                  lineStyle: {
                    width: 2, // 高亮时的线宽
                  },
                  itemStyle: {
                    color: '#42E8E0', // 高亮时的拐点颜色

                    symbolSize: 30, // 高亮时的拐点大小
                  },
                },
              },
              {
                symbolSize: 10, // 拐点大小
                emphasis: {
                  focus: 'series',
                  lineStyle: {
                    width: 2, // 高亮时的线宽
                  },
                  itemStyle: {
                    color: '#42E8E0', // 高亮时的拐点颜色
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
    myChart?.setOption(option);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setTimeRange1 = (range: string) => {
    // ^更新时间范围(week/month)
    selectedRange1.value = range;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!chart1.value) {
      return;
    }

    // ^获取图表实例
    myChart1 = echarts.getInstanceByDom(chart1.value);
    // ^x轴数据和系列数据
    let xAxisData = [];
    let seriesData = [];

    // ^根据时间范围选择数据
    if (range === 'week') {
      xAxisData = weekData1.xAxisData;
      seriesData = weekData1.seriesData;
    } else {
      xAxisData = monthData1.xAxisData;
      seriesData = monthData1.seriesData;
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
      color: ['#04BFDA'],
      tooltip: {
        trigger: 'axis', // 悬浮在数据点上时显示工具提示
        confine: true, // 将提示框限制在图表的区域内

        axisPointer: {
          type: 'line', // 显示一条竖线作为指示器
          lineStyle: {
            // 在这里自定义竖线的样式
            color: '#42E8E0', // 线的颜色
            width: 2, // 线的宽度
            type: 'solid', // 线的类型，例如 'solid', 'dashed', 或 'dotted'
          },
        },
        // formatter: "Temperature :  ", // 提示框内容
        backgroundColor: 'option', // 提示框背景颜色
        borderRadius: 8, // 提示框圆角
        borderWidth: 0, // 提示框边框宽度
        padding: 0, // 提示框内边距，单位px，默认各方向内边距为5，
        textStyle: {
          color: '#fff', // 提示框文本颜色
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
          align: 'left', // 设置标签左对齐
          interval: 0,
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: 'rgba(25, 25, 25, 0.5)',
        },
      },
      yAxis: {
        type: 'value', // Y轴是数值类型
        splitNumber: 3, // 默认通常是 5
        axisLabel: {
          margin: 50,
          formatter: '{value} Tib', // 这里放置你的 Y 轴数据
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
          symbolSize: -1, // 拐点大小
          data: seriesData[0], // 示例数据
          // 区域填充样式
          // areaStyle: {
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: "rgba(10, 225, 239, 0.4)",
          //     },
          //     {
          //       offset: 1,
          //       color: "rgba(4, 191, 218, 0)",
          //     },
          //   ]),
          // },
        },
        {
          lineStyle: {
            width: 2, // 线的宽度
            color: 'rgba(25, 25, 25, 0.3)',
          },
          itemStyle: {
            color: '#3EDFCF',
          },
          type: 'line', // 系列类型是折线图
          smooth: true, // 平滑的线
          showSymbol: false, // 不显示拐点
          symbol: 'circle', // 拐点的形状
          symbolSize: -1, // 拐点大小
          data: seriesData[1], // 示例数据
          // 区域填充样式
          // areaStyle: {
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: "rgba(10, 225, 239, 0.4)",
          //     },
          //     {
          //       offset: 1,
          //       color: "rgba(4, 191, 218, 0)",
          //     },
          //   ]),
          // },
        },
        {
          lineStyle: {
            width: 2, // 线的宽度
            color: '#D22525',
          },
          itemStyle: {
            color: '#D22525',
          },
          type: 'line', // 系列类型是折线图
          smooth: true, // 平滑的线
          showSymbol: false, // 不显示拐点
          symbol: 'circle', // 拐点的形状
          symbolSize: -1, // 拐点大小
          data: seriesData[2], // 示例数据
          // 区域填充样式
          // areaStyle: {
          //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //     {
          //       offset: 0,
          //       color: "rgba(10, 225, 239, 0.4)",
          //     },
          //     {
          //       offset: 1,
          //       color: "rgba(4, 191, 218, 0)",
          //     },
          //   ]),
          // },
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
                align: 'left', // 设置标签左对齐
                fontSize: 8, // 设置 X 轴标签的文字大小
                formatter: function (value: number) {
                  // 使用 '\n' 换行符来创建两行文本
                  return value + '\nTFLOPS';
                },
              },
            },
            tooltip: {
              trigger: 'axis', // 悬浮在数据点上时显示工具提示
              confine: true, // 将提示框限制在图表的区域内

              axisPointer: {
                type: 'none', // 显示一条竖线作为指示器
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
                symbolSize: 10, // 拐点大小
                emphasis: {
                  focus: 'series',
                  lineStyle: {
                    width: 2, // 高亮时的线宽
                  },
                  itemStyle: {
                    color: '#42E8E0', // 高亮时的拐点颜色

                    symbolSize: 30, // 高亮时的拐点大小
                  },
                },
              },
              {
                symbolSize: 10, // 拐点大小
                emphasis: {
                  focus: 'series',
                  lineStyle: {
                    width: 2, // 高亮时的线宽
                  },
                  itemStyle: {
                    color: '#42E8E0', // 高亮时的拐点颜色
                  },

                  symbolSize: 10, // 高亮时的拐点大小
                },
              },
              {
                symbolSize: 10, // 拐点大小
                emphasis: {
                  focus: 'series',
                  lineStyle: {
                    width: 2, // 高亮时的线宽
                  },
                  itemStyle: {
                    color: '#42E8E0', // 高亮时的拐点颜色
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
    myChart1?.setOption(option);
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setTimeRange2 = (range: string) => {
    // ^更新时间范围(week/month)
    selectedRange2.value = range;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!chart2.value) {
      return;
    }

    // ^获取图表实例
    myChart2 = echarts.getInstanceByDom(chart2.value);
    // ^x轴数据和系列数据
    let xAxisData = [];
    let seriesData = [];

    // ^根据时间范围选择数据

    if (range === 'week') {
      xAxisData = weekData2.xAxisData;
      seriesData = weekData2.seriesData;
    } else {
      xAxisData = monthData2.xAxisData;
      seriesData = monthData2.seriesData;
    }

    // 图表配置
    const option = {
      grid: {
        containLabel: true, // 确保坐标轴的标签完全显示
        left: 0,
        right: 40,
        top: 30,
        bottom: 20,
      },
      color: ['#04BFDA'],
      tooltip: {
        trigger: 'axis', // 悬浮在数据点上时显示工具提示
        confine: true, // 将提示框限制在图表的区域内

        axisPointer: {
          type: 'none', // 显示一条竖线作为指示器
        },
        showContent: false, // 不显示 tooltip 内容
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
          align: 'left', // 设置标签左对齐
          interval: 0,
          fontWeight: 500, // 加粗文字
          fontSize: 12, // 设置 X 轴标签的文字大小
          color: 'rgba(25, 25, 25, 0.5)',
        },
      },
      yAxis: {
        type: 'value', // Y轴是数值类型
        splitNumber: 5, // 默认通常是 5
        axisLabel: {
          margin: 50,
          formatter: '{value}UNC/T', // 这里放置你的 Y 轴数据
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
          label: {
            show: true,
            fontWeight: 500, // 加粗文字
            fontSize: 12, // 设置 X 轴标签的文字大小
            color: '#0FACB6',
            position: 'top',
            formatter: function () {
              return '0.142 nanoUNC';
            },
          },
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
          symbolSize: 10, // 拐点大小
          data: seriesData[0], // 示例数据
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
            maxWidth: 1025,
          },
          option: {
            grid: {
              containLabel: true, // 确保坐标轴的标签完全显示
              left: -20,
              right: 30,
              top: 25,
              bottom: 20,
            },
            xAxis: {
              axisLabel: {
                fontSize: 8, // 设置 X 轴标签的文字大小
              },
            },
            yAxis: {
              axisLabel: {
                align: 'left', // 设置标签左对齐
                fontSize: 8, // 设置 X 轴标签的文字大小
                formatter: function (value: number) {
                  // 使用 '\n' 换行符来创建两行文本
                  return value + '\nTFLOPS';
                },
              },
            },
            tooltip: {
              trigger: 'axis', // 悬浮在数据点上时显示工具提示
              confine: true, // 将提示框限制在图表的区域内

              axisPointer: {
                type: 'none', // 显示一条竖线作为指示器
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
    myChart2?.setOption(option);
  };

  onMounted(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (chart.value) {
      // 初始化第一个图表
      myChart = echarts.init(chart.value);
      setTimeRange('week'); // 默认显示周数据

      // 监听窗口大小变化，重新绘制图表
      window.addEventListener('resize', resizeChart);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (chart1.value) {
      // 初始化第二个图表
      myChart1 = echarts.init(chart1.value);
      setTimeRange1('week'); // 默认显示周数据

      // 监听窗口大小变化，重新绘制图表
      window.addEventListener('resize', resizeChart);
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (chart2.value) {
      // 初始化第三个图表
      myChart2 = echarts.init(chart2.value);
      setTimeRange2('week'); // 默认显示周数据

      // 监听窗口大小变化，重新绘制图表
      window.addEventListener('resize', resizeChart);
    }

    // ~监听窗口大小变化
    window.addEventListener('resize', () => {
      // 获取到当前窗口的宽度
      windowWidth.value = document.documentElement.clientWidth;
    });
  });
  // ~重新绘制图表
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function resizeChart() {
    if (myChart != null) {
      // ~调用图表实例的 resize 方法
      myChart.resize();
    }
    if (myChart1 != null) {
      // ~调用图表实例的 resize 方法
      myChart1.resize();
    }
    if (myChart2 != null) {
      // ~调用图表实例的 resize 方法
      myChart2.resize();
    }
  }

  onUnmounted(() => {
    // ~移除监听
    window.removeEventListener('resize', resizeChart);
  });
</script>

<template>
  <div class="user_statistics">
    <HeaderPage :viewport-width="windowWidth" />
    <div :style="{ height: windowWidth > 842 ? '306px' : '206px' }"></div>
    <div class="echartAll">
      <div class="computing_power_trend">
        <div class="month_F">
          <div class="trend">{{ $t('home.power_trend') }}</div>
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
                type="success"
                size="small"
                :style="{
                  color:
                    selectedRange === 'week' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange === 'week' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange === 'week' ? 500 : 300,
                }"
                :plain="selectedRange !== 'week'"
                @click="setTimeRange('week')"
                >{{ $t('home.week') }}</el-button
              >
              <el-button
                class="custom_buttons"
                size="small"
                color="#3EDFCF"
                :style="{
                  color:
                    selectedRange === 'month' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange === 'month' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange === 'month' ? 500 : 300,
                }"
                type="success"
                :plain="selectedRange !== 'month'"
                @click="setTimeRange('month')"
                >{{ $t('home.month') }}</el-button
              >
            </div>

            <el-button
              color="#cedddb"
              class="custom-button"
              :size="viewportWidth > 834 ? 'default' : 'small'"
              >{{ $t('home.see_more') }}</el-button
            >
          </div>
        </div>

        <div ref="chart" style="height: 320px" class="chart_one"></div>
      </div>
    </div>
    <div class="echartAll">
      <div class="computing_power_trend">
        <div class="month_F">
          <div class="trend">{{
            $t('home.Head_miner_computing_power_increment')
          }}</div>
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
                :style="{
                  color:
                    selectedRange1 === 'week' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange1 === 'week' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange1 === 'week' ? 500 : 300,
                }"
                type="success"
                size="small"
                :plain="selectedRange1 !== 'week'"
                @click="setTimeRange1('week')"
                >{{ $t('home.week') }}</el-button
              >
              <el-button
                class="custom_buttons"
                size="small"
                color="#3EDFCF"
                :style="{
                  color:
                    selectedRange1 === 'month'
                      ? ' #000'
                      : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange1 === 'month' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange1 === 'month' ? 500 : 300,
                }"
                type="success"
                :plain="selectedRange1 !== 'month'"
                @click="setTimeRange1('month')"
                >{{ $t('home.month') }}</el-button
              >
            </div>

            <el-button
              color="#cedddb"
              class="custom-button"
              :size="viewportWidth > 834 ? 'default' : 'small'"
              >{{ $t('home.see_more') }}</el-button
            >
          </div>
        </div>

        <div ref="chart1" style="height: 320px" class="chart_one"></div>
      </div>
    </div>
    <div class="echartAll">
      <div class="computing_power_trend">
        <div class="month_F">
          <div class="trend"
            >{{ $t('home.Change_of_service_income') }}(UNC/T)</div
          >
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
                type="success"
                :style="{
                  color:
                    selectedRange2 === 'week' ? ' #000' : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange2 === 'week' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange2 === 'week' ? 500 : 300,
                }"
                size="small"
                :plain="selectedRange2 !== 'week'"
                @click="setTimeRange2('week')"
                >{{ $t('home.week') }}</el-button
              >
              <el-button
                class="custom_buttons"
                size="small"
                color="#3EDFCF"
                :style="{
                  color:
                    selectedRange2 === 'month'
                      ? ' #000'
                      : ' rgba(0, 0, 0, 0.5)',
                  backgroundColor:
                    selectedRange2 === 'month' ? '#3EDFCF' : '#fff',
                  fontWeight: selectedRange2 === 'month' ? 500 : 300,
                }"
                type="success"
                :plain="selectedRange2 !== 'month'"
                @click="setTimeRange2('month')"
                >{{ $t('home.month') }}</el-button
              >
            </div>

            <el-button
              color="#cedddb"
              class="custom-button"
              :size="viewportWidth > 834 ? 'default' : 'small'"
              >{{ $t('home.see_more') }}</el-button
            >
          </div>
        </div>

        <div ref="chart2" style="height: 320px" class="chart_one"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  * {
    box-sizing: border-box;
  }

  .user_statistics {
    width: 100%;
    min-height: 100vh;
    position: relative;
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
    box-shadow:
      0px 4px 15px 0px rgba(92, 255, 243, 0.2),
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
    .echartAll {
      padding: 0 35px;
    }
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
      width: 100%;
      padding: 0 64px;
    }

    .custom_buttons,
    .custom-button {
      font-size: 14px;
    }

    .work_m {
      font-size: 16px;
    }
  }

  @media (max-width: 1023px) {
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
      margin-bottom: 15px;
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
  }
</style>
