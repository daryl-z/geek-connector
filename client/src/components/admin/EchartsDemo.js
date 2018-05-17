import React, { Component } from "react";

// 引入 ECharts 主模块
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

class EchartsDemo extends Component {
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: { text: "最近一年用户注册数量" },
      tooltip: {},
      xAxis: {
        data: [
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二",
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月"
        ]
      },
      yAxis: {},
      series: [
        {
          name: "人数",
          type: "line",
          data: [5, 6, 16, 14, 10, 20, 45, 40, 50, 60, 55, 21]
        }
      ]
    });
  }
  render() {
    return <div id="main" style={{ width: 1200, height: 400 }} />;
  }
}

export default EchartsDemo;
