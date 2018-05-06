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

import { addComment } from "../../actions/postActions";

const FormItem = Form.Item;
const { TextArea } = Input;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newComment = {
          text: values.comment,
          name: user.name,
          avatar: user.avatar
        };
        console.log("Received values of form: ", values);
        this.props.addComment(postId, newComment);
      }
    });
  };

  render() {
    const { errors } = this.state;

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
            <h4>创建新的回帖</h4>
          </div>
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="回复">
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator("comment", {
                  rules: [
                    {
                      min: 2,
                      max: 800,
                      message: "回复长度必须在2至800个字符之间"
                    }
                  ]
                })(<TextArea placeholder="回复内容" />)}
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
