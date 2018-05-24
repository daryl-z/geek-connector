import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, BackTop, Tag, Input, Tooltip, Icon } from "antd";
import GlobalSider from "../layout/GlobalSider";
import { getCategory, editCategory, getPosts } from "../../actions/postActions";
import ReactEcharts from "echarts-for-react";

const { Content } = Layout;

class PostManage extends Component {
  render() {
    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div style={{ fontSize: "36px", marginBottom: "20px" }}>
              帖子管理
            </div>
          </Content>
        </Layout>
      </Content>
    );
  }
}

PostManage.propTypes = {
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({ post: state.post });
export default connect(mapStateToProps, {
  getCategory,
  editCategory,
  getPosts
})(PostManage);
