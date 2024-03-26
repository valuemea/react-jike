import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

const Home = () => {
  const chartRef = useRef()
  useEffect(() => {
    // 1. 获取渲染图表的dom节点(可以直接获取实例，也可以给节点绑定ref 实例)
    // const chartDom = document.getElementById('main');
    const chartDom = chartRef.current;

    // 2. 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 3. 准备图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
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
      style={{ width: '500px', height: '400px' }}>
    </div>
  )
};

export default Home;