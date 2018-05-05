import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Card,
  Button,
  AutoComplete,
  Layout,
  Spin
} from "antd";
import { getPosts } from "../../actions/postActions";

const { Content } = Layout;

class Posts extends Component {
  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    // const { posts, loading } = this.props.post;
    // console.log(this.props.post);
    // let postContent;

    // if (posts === null || loading) {
    //   postContent = <Spin />;
    // } else {
    //   postContent = <PostFeed posts={posts} />;
    // }

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Link to="/dashboard" style={{ margin: "0 20px" }}>
            评论
          </Link>
          <PostForm />
          {/* {postContent} */}
        </Layout>
      </Content>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
