import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Carousel, Layout, Spin, Col, Row } from "antd";
import GlobalSider from "./GlobalSider";
import PostFeed from "../posts/PostFeed";
import { getPosts } from "../../actions/postActions";

const { Content } = Layout;

class IndexContent extends Component {
  componentWillMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    console.log(this.props.post);
    let postContent;
    postContent = <PostFeed posts={posts} />;

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {postContent}
          </Content>
        </Layout>
      </Content>
    );
  }
}

IndexContent.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(IndexContent);

{
  /* <Carousel autoplay>
              <div>
                <h3> 数百种编程语言，而我为什么要学 Python？ </h3>
              </div>
              <div>
                <h3>网页样式——各种炫酷效果及实现代码 </h3>
              </div>
              <div>
                <h3>
                  令人难以理解的软件工程师：几千行代码能搞定的为什么要写几万行？
                </h3>
              </div>
              <div>
                <h3>不止 Java，Oracle 向 JavaScript 开炮！</h3>
              </div>
            </Carousel> */
}
