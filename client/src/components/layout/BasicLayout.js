import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import GlobalHeader from "./GlobalHeader";
import IndexContent from "./IndexContent";
import GlobalFooter from "./GlobalFooter";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class BasicLayout extends Component {
  render() {
    return (
      <div>
        <Layout>
          <GlobalHeader />
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <Layout style={{ padding: "24px 0", background: "#fff" }}>
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
                    <Menu.Item key="5">个人中心</Menu.Item>
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
                        <Icon type="laptop" />其他
                      </span>
                    }
                  >
                    <Menu.Item key="13">大数据</Menu.Item>
                    <Menu.Item key="14">人工智能</Menu.Item>
                    <Menu.Item key="15">机器学习</Menu.Item>
                    <Menu.Item key="16">深度学习</Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <IndexContent />
              </Content>
            </Layout>
          </Content>
          <GlobalFooter />
        </Layout>
      </div>
    );
  }
}
