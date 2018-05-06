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

import { addComment } from "../../actions/postActions";

const FormItem = Form.Item;
const { TextArea } = Input;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      editorState: EditorState.createEmpty(),
      htmlContent: ""
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
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

  handleSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newComment = {
          text: this.state.htmlContent,
          name: user.name,
          avatar: user.avatar
        };
        console.log("Received values of form: ", values);
        this.props.addComment(postId, newComment);
        this.setState({
          htmlContent: "",
          editorState: EditorState.createEmpty()
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editorState, errors } = this.state;

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
            <h4>创建新的回帖</h4>
          </div>
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="回复">
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
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addComment })(
  Form.create()(CommentForm)
);
