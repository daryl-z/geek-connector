import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PostForm from "./PostForm";
import { Layout, BackTop } from "antd";

const { Content } = Layout;

class Posts extends Component {
  render() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <BackTop />
          <a onClick={this.props.history.goBack} style={{ margin: "0 20px" }}>
            返回上一级
          </a>
          <PostForm />
        </Layout>
      </Content>
    );
  }
}

export default withRouter(Posts);
