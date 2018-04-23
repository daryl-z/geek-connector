import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import "./styles.css";

const { Header } = Layout;

export default class GlobalHeader extends Component {
  render() {
    return (
      <Header className="header">
        <Link to="/" className="logo">
          Dev Player
        </Link>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["4"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="4">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="2">帖子</Menu.Item>
          <Menu.Item key="1">
            {" "}
            <Link to="/profiles">开发者们</Link>
          </Menu.Item>

          <Menu.Item key="3" style={{ float: "right" }}>
            <Link to="/register">注册</Link>
          </Menu.Item>
          <Menu.Item key="5" style={{ float: "right" }}>
            <Link to="/login">登录</Link>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}
