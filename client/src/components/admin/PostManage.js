import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, BackTop, Tag, Input, Tooltip, Icon } from "antd";
import GlobalSider from "../layout/GlobalSider";
import { getPosts } from "../../actions/postActions";
import ReactEcharts from "echarts-for-react";
import PostFeed from "../posts/PostFeed";

const { Content } = Layout;

class PostManage extends Component {
  componentWillMount() {
    this.props.getPosts();
  }
  render() {
    const { posts } = this.props.post;
    const { auth } = this.props;

    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div style={{ fontSize: "36px", marginBottom: "20px" }}>
              帖子管理
            </div>
            <PostFeed posts={posts} auth={auth} />
          </Content>
        </Layout>
      </Content>
    );
  }
}

PostManage.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ post: state.post, auth: state.auth });

export default connect(mapStateToProps, {
  getPosts
})(PostManage);
