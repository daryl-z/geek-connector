import React, { Component } from "react";
import {
  List,
  Avatar,
  Button,
  Spin,
  Icon,
  Col,
  Row,
  Popconfirm,
  message
} from "antd";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setCurrentData,
  setCurrentPage,
  adminDeletePost
} from "../../actions/postActions";
class PostFeed extends Component {
  createMarkup = htmlcode => ({
    __html: htmlcode
  });

  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onLikeClick = id => {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }
    this.props.addLike(id);
  };

  onUnlikeClick = id => {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push("/login");
    }
    this.props.removeLike(id);
  };

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  findUserUnlike(unlikes) {
    const { auth } = this.props;
    if (unlikes.filter(unlike => unlike.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    let { posts, auth, adminDeletePost } = this.props;
    const { setCurrentData, setCurrentPage } = this.props;
    const { current, currentData } = this.props.post;
    // List分页
    const pagination = {
      pageSize: 5,
      current: current,
      total: posts ? posts.length : 0,
      onChange: (page, pageSize) => {
        let start = (page - 1) * pageSize;
        setCurrentData(posts.slice(start, start + pageSize));
        setCurrentPage(page);
      }
    };

    const IconText = ({ type, text, onClick }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
        {text}
      </span>
    );
    // console.log(window.location.pathname);
    const popContent = "你确定要删除此项吗?";

    function confirm(id) {
      adminDeletePost(id);
      // console.log(adminDeletePost(id));
      message.info("删除成功");
    }

    return currentData ? (
      <List
        pagination={pagination}
        itemLayout="horizental"
        dataSource={
          currentData.length === 0
            ? posts
              ? posts.slice(0, 5)
              : []
            : currentData
        }
        renderItem={item => (
          <List.Item
            actions={
              auth.user.admin === true && window.location.pathname !== "/"
                ? [
                    <Popconfirm
                      placement="left"
                      title={popContent}
                      onConfirm={() => confirm(item._id)}
                      // onConfirm={() => console.log(item._id)}
                      okText="是"
                      cancelText="否"
                    >
                      <a style={{ color: "red" }}>删除</a>
                    </Popconfirm>
                  ]
                : [
                    <IconText
                      type={this.findUserLike(item.likes) ? "like" : "like-o"}
                      text={item.likes ? item.likes.length : "0"}
                      onClick={e => this.onLikeClick(item._id)}
                      style={{ zIndex: "200" }}
                    />,
                    <IconText
                      type={
                        this.findUserUnlike(item.unlikes)
                          ? "dislike"
                          : "dislike-o"
                      }
                      text={item.unlikes ? item.unlikes.length : "0"}
                      onClick={() => this.onUnlikeClick(item._id)}
                    />,
                    <Link to={`/post/${item._id}`}>
                      <IconText
                        type="message"
                        text={item.comments ? item.comments.length : "0"}
                      />
                    </Link>
                  ]
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Link to={`/post/${item._id}`}>
                  <h3>{item.title}</h3>
                </Link>
              }
              description={item.name}
            />
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "500px",
                height: "30px"
              }}
              dangerouslySetInnerHTML={this.createMarkup(item.text)}
            />
          </List.Item>
        )}
      />
    ) : (
      <Row>
        <Col span={11} />
        <Col span={2}>暂无帖子</Col>
        <Col span={11} />
      </Row>
    );
  }
}

PostFeed.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  adminDeletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, {
  setCurrentData,
  setCurrentPage,
  adminDeletePost
})(withRouter(PostFeed));
