import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, Avatar, Button, Spin, Icon } from "antd";
import PostItem from "./PostItem";
import reqwest from "reqwest";

const fakeDataUrl =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";

class PostFeed extends Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: []
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

  render() {
    const { posts } = this.props;
    console.log(posts);
    const { loading, loadingMore, showLoadingMore, data } = this.state;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
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

    return (
      <List
        loading={loading}
        itemLayout="vertical"
        loadMore={loadMore}
        dataSource={posts}
        renderItem={item => (
          <List.Item
            actions={[
              <IconText type="star-o" text="156" />,
              <IconText
                type="like-o"
                text={item.likes ? item.likes.length : "0"}
              />,
              <IconText
                type="message"
                text={item.comments ? item.comments.length : "0"}
              />
            ]}
            extra={
              <img
                width={272}
                alt="album"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="#">{item.name}</a>}
              description={item.text}
            />
            <div dangerouslySetInnerHTML={this.createMarkup(item.text)} />
          </List.Item>
        )}
      />
    );
    // return posts.map(post => <PostItem key={post._id} post={post} />);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
