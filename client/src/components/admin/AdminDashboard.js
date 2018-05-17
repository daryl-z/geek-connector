import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Carousel, Layout, BackTop } from "antd";
import GlobalSider from "../layout/GlobalSider";
import EchartsDemo from "./EchartsDemo";

const { Content } = Layout;

class AdminDashboard extends Component {
  render() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            管理员dashboard
            <EchartsDemo />
          </Content>
        </Layout>
      </Content>
    );
  }
}
export default AdminDashboard;
