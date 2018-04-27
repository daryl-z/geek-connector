import React, { Component } from "react";
import { Layout, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./styles.css";

const { Header } = Layout;
class GlobalHeader extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const registerLink = (
      <Menu.Item key="3" style={{ float: "right" }}>
        <Link to="/register">注册</Link>
      </Menu.Item>
    );
    const loginLink = (
      <Menu.Item key="5" style={{ float: "right" }}>
        <Link to="/login">登录</Link>
      </Menu.Item>
    );

    const authLinks = (
      <Menu.Item key="3" style={{ float: "right" }}>
        <Link to="/login" onClick={this.onLogoutClick}>
          <Avatar
            src={user.avatar}
            size="small"
            icon="user"
            alt={user.name}
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            title="用邮箱绑定Gavatar才能显示头像"
          />
          &nbsp;&nbsp;注销
        </Link>
      </Menu.Item>
    );
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
          {isAuthenticated ? authLinks : [registerLink, loginLink]}
        </Menu>
      </Header>
    );
  }
}

GlobalHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(GlobalHeader);
