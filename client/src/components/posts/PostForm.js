import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
  Layout
} from "antd";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import { addPost } from "../../actions/postActions";
// import EditorConvertToHTML from "../common/draft-editor";
const FormItem = Form.Item;
const { TextArea } = Input;

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
      editorState: EditorState.createEmpty(),
      htmlContent: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEditorStateChange = editorState => {
    this.setState(
      {
        editorState,
        htmlConent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
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

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, editorState } = this.state;

    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

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
          <FormItem {...formItemLayout} label="帖子内容">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("post", {
                  rules: []
                })(
                  <div>
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
                    {/* <textarea
                    disabled
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                  /> */}
                  </div>
                )}
              </Col>
              <Col span={12} />
            </Row>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
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

export default connect(mapStateToProps, { addPost })(Form.create()(PostForm));
