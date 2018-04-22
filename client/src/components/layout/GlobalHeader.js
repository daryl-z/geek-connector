import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./styles.css";

const { Header } = Layout;

export default class GlobalHeader extends Component {
  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["4"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="4">首页</Menu.Item>
          <Menu.Item key="2">分类</Menu.Item>
          <Menu.Item key="1">开发者们</Menu.Item>

          <Menu.Item key="3" style={{ float: "right" }}>
            注册
          </Menu.Item>
          <Menu.Item key="5" style={{ float: "right" }}>
            登录
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
