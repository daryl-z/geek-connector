import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import randomColor from "randomcolor";
import TagCloud from "react-tag-cloud";
import CloudItem from "./CloudItem";
import { Layout, Col, Row, Card, Icon, List, Avatar, Button } from "antd";
import {
  setCurrentData,
  setCurrentPage,
  getPosts,
  deletePost,
  addLike,
  removeLike
} from "../../actions/postActions";
import "./style.css";

const { Content } = Layout;
const styles = {
  large: {
    fontSize: 60,
    fontWeight: "bold"
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  }
};

class MyCloud extends Component {
  state = {
    tagFilterList: [],
    tagCloudVisible: true
  };

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 3000);
  }

  componentWillMount() {
    this.props.getPosts();
    this.setState({ tagCloudVisible: true });
  }

  // flatten array
  flatten = arr =>
    arr.reduce(
      (prev, item) =>
        prev.concat(Array.isArray(item) ? this.flatten(item) : item),
      []
    );

  // get all tags
  getAllTags = () => {
    let tagList = Array.of();
    this.props.post.posts.map(item => tagList.push(item.tags));
    return _.uniq(this.flatten(tagList));
  };

  // click tag
  showPostList = value => {
    console.log(value);
    let filterList = this.props.post.posts.filter(post =>
      post.tags.includes(value)
    );
    console.log(filterList);
    this.setState({ tagFilterList: filterList, tagCloudVisible: false });
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

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  findUserUnlike = unlikes => {
    const { auth } = this.props;
    if (unlikes.filter(unlike => unlike.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { posts } = this.props.post;
    // get all tags
    let allTags = this.getAllTags();
    const tagList = [];
    for (let i = 0; i < allTags.length; i++) {
      tagList.push(
        <div
          value={allTags[i]}
          key={i.toString() + i}
          onClick={() => this.showPostList(allTags[i])}
        >
          {allTags[i]}
        </div>
      );
    }

    const { setCurrentData, setCurrentPage } = this.props;
    const { current, currentData } = this.props.post;
    let { tagFilterList, tagCloudVisible } = this.state;
    // List分页
    // const pagination = {
    //   pageSize: 5,
    //   current: current,
    //   total: posts ? posts.length : 0,
    //   onChange: (page, pageSize) => {
    //     let start = (page - 1) * pageSize;
    //     setCurrentData(posts.slice(start, start + pageSize));
    //     setCurrentPage(page);
    //   }
    // };

    const IconText = ({ type, text, onClick }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} onClick={onClick} />
        {text}
      </span>
    );

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          {tagCloudVisible ? (
            <Link to="/" style={{ margin: "0 20px" }}>
              返回首页
            </Link>
          ) : (
            <a
              onClick={() => (window.location = "/tagcloud")}
              style={{ margin: "0 20px" }}
            >
              返回上一级
            </a>
          )}
          <Card
            bordered={false}
            style={{ margin: "0 20px", minHeight: "800px" }}
            title={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4>标签云</h4>
              </div>
            }
          >
            {tagFilterList.length > 0 ? (
              <List
                // pagination={pagination}
                itemLayout="horizental"
                dataSource={
                  currentData.length === 0
                    ? tagFilterList
                      ? tagFilterList.slice(0, 5)
                      : []
                    : currentData
                }
                style={{ zIndex: "200" }}
                renderItem={item => (
                  <List.Item
                    actions={[
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
                <Col span={2}> </Col>
                <Col span={11} />
              </Row>
            )}

            {tagCloudVisible ? (
              <div className="app-outer">
                <div className="app-inner">
                  <TagCloud
                    className="tag-cloud"
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: 30,
                      color: () =>
                        randomColor({
                          hue: "blue"
                        }),
                      padding: 5
                    }}
                  >
                    {tagList}
                  </TagCloud>
                </div>
              </div>
            ) : (
              ""
            )}
          </Card>
        </Layout>
      </Content>
    );
  }
}

MyCloud.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(mapStateToProps, {
  setCurrentData,
  setCurrentPage,
  getPosts,
  addLike,
  removeLike,
  deletePost
})(withRouter(MyCloud));
