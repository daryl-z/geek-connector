import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Layout, BackTop, Tag, Input, Tooltip, Icon } from "antd";
import GlobalSider from "../layout/GlobalSider";
import { getCategory, editCategory } from "../../actions/postActions";
import EchartsDemo from "./EchartsDemo";

const { Content } = Layout;

class TagMangage extends Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: ""
  };

  componentWillMount() {
    this.props.getCategory();

    // console.log(this.props.post.category);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.category) {
      if (nextProps.post.category.length > 0) {
        this.setState({ tags: nextProps.post.category });
      }
    }
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags }, this.props.editCategory(tags));
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState(
      {
        tags,
        inputVisible: false,
        inputValue: ""
      },
      this.props.editCategory(tags)
    );
  };

  saveInputRef = input => (this.input = input);
  render() {
    let { category } = this.props.post;
    const { tags, inputVisible, inputValue } = this.state;
    let options = {
      title: { text: "不同分类下的文章数" },
      tooltip: {},
      xAxis: {
        data: category
      },
      yAxis: {},
      series: [
        {
          name: "文章数",
          type: "bar",
          data: [5, 6, 16, 14, 10, 20, 45, 40, 50, 60, 55, 21]
        }
      ]
    };
    console.log(category);

    return (
      <Content style={{ padding: "0 50px" }}>
        <BackTop />
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <GlobalSider />
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <div style={{ fontSize: "36px", marginBottom: "20px" }}>
              分类管理
            </div>
            <div>
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    color="blue"
                    key={tag}
                    closable={true}
                    afterClose={() => this.handleClose(tag)}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: "#fff", borderStyle: "dashed" }}
                >
                  <Icon type="plus" /> 新的分类
                </Tag>
              )}
            </div>
            <div>
              <EchartsDemo options={options} />
            </div>
          </Content>
        </Layout>
      </Content>
    );
  }
}

TagMangage.propTypes = {
  post: PropTypes.object.isRequired
};
const mapStateToProps = state => ({ post: state.post });
export default connect(mapStateToProps, { getCategory, editCategory })(
  TagMangage
);
