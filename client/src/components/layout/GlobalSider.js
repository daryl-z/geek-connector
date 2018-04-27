import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
class GlobalSider extends Component {
  render() {
    return (
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />用户
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/dashboard">个人中心</Link>
            </Menu.Item>
            <Menu.Item key="6">帖子管理</Menu.Item>
            <Menu.Item key="7">教育信息</Menu.Item>
            <Menu.Item key="8">工作经历</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="laptop" />前端
              </span>
            }
          >
            <Menu.Item key="1">HTML/CSS</Menu.Item>
            <Menu.Item key="3">JavaScript</Menu.Item>
            <Menu.Item key="2">React</Menu.Item>
            <Menu.Item key="4">Vue</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="laptop" />后端
              </span>
            }
          >
            <Menu.Item key="9">Java</Menu.Item>
            <Menu.Item key="10">Node.js</Menu.Item>
            <Menu.Item key="11">PHP</Menu.Item>
            <Menu.Item key="12">Python</Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="laptop" />热门
              </span>
            }
          >
            <Menu.Item key="13">大数据</Menu.Item>
            <Menu.Item key="14">人工智能</Menu.Item>
            <Menu.Item key="15">机器学习</Menu.Item>
            <Menu.Item key="16">计算机视觉</Menu.Item>
          </SubMenu>
          <Menu.Item key="qita">
            <Icon type="laptop" />其它
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
export default GlobalSider;
