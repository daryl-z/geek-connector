import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { Carousel, Layout, BackTop } from "antd";
import store from "../../store";
import GlobalSider from "../layout/GlobalSider";
import EchartsDemo from "./EchartsDemo";

const { Content } = Layout;

// // 检查token
// if (localStorage.jwtToken) {
//   // 设置头部验证
//   setAuthToken(localStorage.jwtToken);
//   // 解码token获取用户信息
//   const decoded = jwt_decode(localStorage.jwtToken);
//   console.log(decoded);
//   if (decoded.admin === false) {
//     window.location.href = "/not-found";
//   }
// }

class AdminDashboard extends Component {
  render() {
    const options = {
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
    };
    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            管理员dashboard
            <EchartsDemo options={options} />
          </Content>
        </Layout>
      </Content>
    );
  }
}
export default AdminDashboard;
