import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Checkbox,
  Button,
  Layout,
  Alert
} from "antd";
// import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";

const FormItem = Form.Item;
const { Content } = Layout;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      errors: {},
      alertVisible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }, () => {
        if (this.state.errors) {
          if (this.state.errors.email !== undefined)
            this.setState({ alertVisible: true });
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        if (values.agreement !== true) {
          //需要弹一个提示 不同意协议的不准注册
          return;
        }
        // actionCreator mapDispatchToProps
        this.props.registerUser(values, this.props.history);
        // console.log(this.state.errors);
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次输入的密码不一致！");
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { alertVisible } = this.state;
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
            <h1>用户注册</h1>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {alertVisible && (
                <Alert message={this.state.errors.email} type="error" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  用户昵称&nbsp;
                  <Tooltip title="其他用户如何称呼您?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "请输入您的用户昵称!",
                    whitespace: true
                  },
                  {
                    min: 2,
                    max: 18,
                    message: "用户名长度必须在2至18个字符之间"
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="邮箱">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "当前邮箱不合法！"
                  },
                  {
                    validator: this.isRegistered
                  },
                  {
                    required: true,
                    message: "请输入您的邮箱！"
                  }
                ]
              })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="密码">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "请输入密码！"
                  },
                  {
                    validator: this.validateToNextPassword
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,
                    message:
                      "至少8-16个字符，至少1个大写字母，1个小写字母和1个数字"
                  }
                ]
              })(<Input type="password" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator("password2", {
                rules: [
                  {
                    required: true,
                    message: "请确认您的密码！"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator("agreement", {
                valuePropName: "checked"
              })(
                <Checkbox>
                  我已经阅读并同意
                  <a href="javacript:;">《经常被无视的协议》</a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp; 已有账号？
              <Link to="/login">现在登录！</Link>
            </FormItem>
          </Form>
        </Layout>
      </Content>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(
  withRouter(Form.create()(Register))
);
