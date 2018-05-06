import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Form,
  Input,
  Icon,
  Row,
  Col,
  Card,
  Button,
  Layout,
  Select
} from "antd";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

import { addPost } from "../../actions/postActions";
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      editorState: EditorState.createEmpty(),
      htmlContent: ""
    };
  }

  onEditorStateChange = editorState => {
    this.setState(
      {
        editorState,
        htmlContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
      },
      // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
      console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    );
  };

  uploadImageCallBack = file => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/posts/upload");
      xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { user } = this.props.auth;

        const newPost = {
          category: values.category,
          title: values.title,
          text: this.state.htmlContent,
          name: user.name,
          avatar: user.avatar
        };
        console.log("Received values of form: ", newPost);
        this.props.addPost(newPost, this.props.history);
        this.setState({
          htmlContent: "",
          editorState: EditorState.createEmpty()
        });
      }
    });
  };

  render() {
    const { errors, editorState } = this.state;

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Card
        bordered={false}
        style={{ margin: "0 20px" }}
        extra={<Icon type="ellipsis" />}
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h4>说点什么吧~</h4>
          </div>
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="标题：">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("title", {
                  rules: [
                    {
                      required: true,
                      message: "请输入帖子标题!",
                      whitespace: true
                    },
                    {
                      min: 2,
                      max: 180,
                      message: "长度必须在2至180个字符之间"
                    }
                  ]
                })(<Input />)}
              </Col>
              <Col span={12} />
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="帖子分类">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("category", {
                  rules: [
                    {
                      required: true,
                      message: "请选择帖子的分类!",
                      whitespace: true
                    }
                  ]
                })(
                  <Select
                    style={{ width: "100%" }}
                    onChange={this.handleChange}
                    placeholder="帖子分类"
                  >
                    <Option value="HTML/CSS">HTML/CSS</Option>
                    <Option value="JavaScript">JavaScript</Option>
                    <Option value="React">React</Option>
                    <Option value="Vue">Vue</Option>
                    <Option value="NodeJS">NodeJS</Option>
                    <Option value="Java">Java</Option>
                    <Option value="other">其他</Option>
                  </Select>
                )}
              </Col>
              <Col span={12} />
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="帖子内容">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("post", {
                  rules: []
                })(
                  <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    editorStyle={{ border: "1px solid #f1f1f1" }}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      image: {
                        uploadCallback: this.uploadImageCallBack,
                        alt: { present: true, mandatory: true }
                      }
                    }}
                  />
                )}
              </Col>
              <Col span={12} />
            </Row>
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(
  Form.create()(withRouter(PostForm))
);
