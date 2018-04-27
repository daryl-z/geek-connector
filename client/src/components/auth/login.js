import React, { Component } from "react";
import { Form, Input, Icon, Checkbox, Button, Layout, Alert } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";

const FormItem = Form.Item;
const { Content } = Layout;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertVisible: false,
      errors: {}
    };
  }

  //如果用户已登录则不能访问登录页面
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }, () => {
        if (this.state.errors) {
          if (
            this.state.errors.email !== undefined ||
            this.state.errors.password !== undefined
          )
            this.setState({ alertVisible: true });
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.props.loginUser(values);
      }
    });
  };

  renderMessage = content => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={content}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errors, alertVisible } = this.state;
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
    console.log(errors);
    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>用户登录</h1>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {alertVisible && errors.email && this.renderMessage(errors.email)}
            </FormItem>
            <FormItem>
              {alertVisible &&
                errors.password &&
                this.renderMessage(errors.password)}
            </FormItem>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateProps, { loginUser })(Form.create()(Login));
