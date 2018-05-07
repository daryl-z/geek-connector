import React, { Component } from "react";
import { List, Avatar, Button, Spin, Icon, Col, Row } from "antd";
import { withRouter, Link } from "react-router-dom";

import reqwest from "reqwest";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

class PostFeed extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true
  };

  componentDidMount() {
    this.getData(res => {
      this.setState({
        loading: false,
        data: res.results
      });
    });
  }

  getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: "json",
      method: "get",
      contentType: "application/json",
      success: res => {
        callback(res);
      }
    });
  };

  onLoadMore = () => {
    this.setState({
      loadingMore: true
    });
    this.getData(res => {
      const data = this.state.data.concat(res.results);
      this.setState(
        {
          data,
          loadingMore: false
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event("resize"));
        }
      );
    });
  };

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
    let { posts } = this.props;
    console.log(posts);
    const { loading, loadingMore, showLoadingMore } = this.state;

    const IconText = ({ type, text, onClick }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
        {text}
      </span>
    );

    const loadMore = showLoadingMore ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px"
        }}
      >
        {loadingMore && <Spin />}
        {!loadingMore && (
          <Button onClick={this.onLoadMore}>点击加载更多</Button>
        )}
      </div>
    ) : null;

    return posts ? (
      <List
        loading={loading}
        itemLayout="horizental"
        loadMore={loadMore}
        dataSource={posts}
        renderItem={item => (
          <List.Item
            actions={[
              <IconText
                type={this.findUserLike(item.likes) ? "like" : "like-o"}
                text={item.likes ? item.likes.length : "0"}
                onClick={e => this.onLikeClick(item._id)}
              />,
              <IconText
                type={
                  this.findUserUnlike(item.unlikes) ? "dislike" : "dislike-o"
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
            ]}
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
export default withRouter(PostFeed);
