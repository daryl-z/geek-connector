import React, { Component } from "react";
import { Layout, Menu, Avatar, Icon } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import "./styles.css";

const { Header } = Layout;
class GlobalHeader extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    // 清空用户简介 登出
    this.props.clearCurrentProfile();
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
        <Link
          to="/login"
          onClick={this.onLogoutClick}
          style={{ float: "right" }}
        >
          &nbsp;&nbsp;注销
        </Link>
      </Menu.Item>
    );

    const posts = (
      <Menu.Item key="posts" style={{ float: "right" }}>
        <Link to="/feed">
          <Icon type="edit" />发帖
        </Link>
      </Menu.Item>
    );

    const userAvatar = (
      <Menu.Item key="avatar" style={{ float: "right" }}>
        <Link to="/dashboard">
          <Avatar
            src={user.avatar}
            size="small"
            icon="user"
            alt={user.name}
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
            title="个人中心"
          />
        </Link>
      </Menu.Item>
    );

    return (
      <Header className="header">
        <Link to="/" className="logo">
          {/* Dev Player */}
        </Link>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["index"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="index">
            <Link to="/">首页</Link>
          </Menu.Item>
          <Menu.Item key="developers">
            <Link to="/profiles">开发者们</Link>
          </Menu.Item>
          <Menu.Item key="tagcloud">
            <Link to="/tagcloud">标签云</Link>
          </Menu.Item>
          {isAuthenticated
            ? [authLinks, userAvatar, posts]
            : [registerLink, loginLink]}
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

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  GlobalHeader
);
