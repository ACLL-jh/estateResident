import { FC, useEffect } from 'react'
import * as echarts from 'echarts';
const EchartDom: React.FC<any> = () => {
  function fn() {
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: '数据展示'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['保修总数', '投诉总数',]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '保修总数',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '投诉总数',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },

      ]
    };
    option && myChart.setOption(option);
  }
  useEffect(() => {
    fn()
  }, [])
  return (
    <div id='main' style={{ width: '100%', height: '400px' }}>

    </div>
  )
};
export default EchartDom;
