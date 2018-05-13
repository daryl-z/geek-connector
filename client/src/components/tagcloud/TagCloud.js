import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import randomColor from "randomcolor";
import TagCloud from "react-tag-cloud";
import CloudItem from "./CloudItem";
import { Layout, Col, Row, Card, Icon } from "antd";
import {
  setCurrentData,
  setCurrentPage,
  getPosts
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
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 3000);
  }

  componentWillMount() {
    this.props.getPosts();
  }

  // 扁平化数组
  flatten = arr =>
    arr.reduce(
      (prev, item) =>
        prev.concat(Array.isArray(item) ? this.flatten(item) : item),
      []
    );

  // 获取所有的tag
  getAllTags = () => {
    let tagList = Array.of();
    this.props.post.posts.map(item => tagList.push(item.tags));
    return _.uniq(this.flatten(tagList));
  };

  render() {
    const { posts } = this.props.post;
    let allTags = this.getAllTags();
    const tagList = [];
    for (let i = 0; i < allTags.length; i++) {
      tagList.push(
        <div value={allTags[i]} key={i.toString() + i}>
          {allTags[i]}
        </div>
      );
    }
    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Link to="/" style={{ margin: "0 20px" }}>
            返回首页
          </Link>
          <Card
            bordered={false}
            style={{ margin: "0 20px", minHeight: "800px" }}
            title={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4>标签云</h4>
              </div>
            }
          >
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
          </Card>
        </Layout>
      </Content>
    );
  }
}

MyCloud.propTypes = {
  setCurrentData: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});
export default connect(mapStateToProps, {
  setCurrentData,
  setCurrentPage,
  getPosts
})(withRouter(MyCloud));
