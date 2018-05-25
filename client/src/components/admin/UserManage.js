import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, BackTop, Tag, Input, Tooltip, Icon } from "antd";
import GlobalSider from "../layout/GlobalSider";
import { deleteUser } from "../../actions/profileActions";
import ReactEcharts from "echarts-for-react";
import Profiles from "../profiles/Profiles";

const { Content } = Layout;

class UserManage extends Component {
  render() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div style={{ fontSize: "36px", marginBottom: "20px" }}>
              用户管理
            </div>
            <Profiles extra={true} />
          </Content>
        </Layout>
      </Content>
    );
  }
}

// UserManage.propTypes = {
//   post: PropTypes.object.isRequired
// };
const mapStateToProps = state => ({ post: state.post });
export default connect(mapStateToProps, {
  deleteUser
})(UserManage);
