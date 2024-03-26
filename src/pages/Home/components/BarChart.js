// 封装组件图组件
import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const BarChart = ({ title, xData = [], sData = [], style = { width: '400px', height: '300px' } }) => {
  const chartRef = useRef()
  useEffect(() => {
    // 1. 获取渲染图表的dom节点(可以直接获取实例，也可以给节点绑定ref 实例)
    // const chartDom = document.getElementById('main');
    const chartDom = chartRef.current;

    // 2. 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 3. 准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: xData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: sData,
          type: 'bar'
        }
      ]
    };
    // 4. 使用图表参数完成图表的渲染
    option && myChart.setOption(option);

  }, [])
  return (
    <div
      // id="main"
      ref={chartRef}
      style={style}>
    </div>
  );
};

export default BarChart;