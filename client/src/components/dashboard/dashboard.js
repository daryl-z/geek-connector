import React, { Component } from "react";
import { Spin, Layout } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";

const { Content } = Layout;

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = <Spin tip="正在加载..." />;
    } else {
      // dashboardContent = <h1>Hello</h1>;
      // 用户是否有简介
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>DIsplay profile</h4>;
      } else {
        // 用户一登陆 但是没简介
        <Link to="create-profile">创建个人简介</Link>;
      }
    }
    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>个人中心</h1>
          </div>
          <div>
            <h1>Dashboard</h1>
            {dashboardContent}
          </div>
        </Layout>
      </Content>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
