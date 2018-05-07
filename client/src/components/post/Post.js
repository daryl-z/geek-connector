import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Moment from "react-moment";
import { Card, Layout, Spin, BackTop } from "antd";
import { getPost } from "../../actions/postActions";

const { Content } = Layout;

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  createMarkup = htmlcode => ({
    __html: htmlcode
  });

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spin />;
    } else {
      postContent = (
        <div>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h1>{post.title}</h1>
              </div>
            }
            style={{ margin: "20px 20px" }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              日期：<Moment format="YYYY/MM/DD">{post.date}</Moment>
              <span>&nbsp;&nbsp;&nbsp;作者：</span>
              {post.name}
              <span>&nbsp;&nbsp;&nbsp;分类：</span>
              {post.category}
            </div>
            <div dangerouslySetInnerHTML={this.createMarkup(post.text)} />
          </Card>
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <BackTop />
          <a onClick={this.props.history.goBack} style={{ margin: "0 20px" }}>
            返回上一级
          </a>
          {postContent}
        </Layout>
      </Content>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(withRouter(Post));
