import React, { Component } from "react";
import { Form, Input, Icon, Checkbox, Button, Layout } from "antd";
import { Link } from "react-router-dom";

const FormItem = Form.Item;
const { Content } = Layout;

// import PropTypes from "prop-types";

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 }
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
          offset: 9
        }
      }
    };

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>用户登录</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator("email", {
                rules: [{ required: true, message: "请输入您的邮箱！" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
              &nbsp;&nbsp;&nbsp;
              <a className="login-form-forgot" href="">
                忘记密码
              </a>
              或者 <Link to="/register">现在注册！</Link>
            </FormItem>
          </Form>
        </Layout>
      </Content>
    );
  }
}

export default Form.create()(Login);
