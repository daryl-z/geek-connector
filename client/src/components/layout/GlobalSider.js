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
          // defaultSelectedKeys={["dashboard"]}
          // defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <Menu.Item key="dashboard">
            <Link to="/admin">
              <Icon type="laptop" />
              Dashboard
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />帖子管理
              </span>
            }
          >
            <Menu.Item key="tagmanage">
              <Link to="/admin/tag-manage">标签管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}
export default GlobalSider;
