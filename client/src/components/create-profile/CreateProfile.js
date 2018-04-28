import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Layout
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const { Content } = Layout;

const residences = [
  {
    value: "anhui",
    label: "安徽",
    children: [
      {
        value: "maanshan",
        label: "马鞍山",
        children: [
          {
            value: "ahut",
            label: "安徽工业大学"
          }
        ]
      }
    ]
  },
  {
    value: "zhejiang",
    label: "浙江",
    children: [
      {
        value: "hangzhou",
        label: "杭州",
        children: [
          {
            value: "xihu",
            label: "西湖"
          }
        ]
      }
    ]
  },
  {
    value: "上海",
    label: "上海",
    children: [
      {
        value: "changningqu",
        label: "长宁区",
        children: [
          {
            value: "hongqiao",
            label: "虹桥"
          }
        ]
      }
    ]
  }
];

class CreateProfile extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
      callback("Two passwords that you enter is inconsistent!");
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
  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = [".com", ".org", ".net"].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  handleChange = value => {
    console.log(`selected ${value}`);
  };

  render() {
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

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>修改个人信息</h1>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  简介名称&nbsp;
                  <Tooltip title="作为简介的唯一标识">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("handle", {
                    rules: [
                      {
                        required: true,
                        message: "请输入简历的名称!",
                        whitespace: true
                      }
                    ]
                  })(<Input />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="工作状态">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("status", {
                    rules: [
                      {
                        required: true,
                        message: "请选择您的工作状态!",
                        whitespace: true
                      }
                    ]
                  })(
                    <Select
                      defaultValue="lucy"
                      style={{ width: "100%" }}
                      onChange={this.handleChange}
                    >
                      <Option value="developer">开发者</Option>
                      <Option value="junior">初级开发者</Option>
                      <Option value="senior">高级开发者</Option>
                      <Option value="teacher">教师</Option>
                      <Option value="student">学生或者是学习中</Option>
                      <Option value="other">其他</Option>
                    </Select>
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="公司">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("company", {
                    rules: []
                  })(<Input />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="个人主页">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("website", {
                    rules: []
                  })(
                    <AutoComplete
                      dataSource={websiteOptions}
                      onChange={this.handleWebsiteChange}
                      placeholder="个人或公司的网址"
                    >
                      <Input />
                    </AutoComplete>
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="居住地">
              <Row gutter={8}>
                <Col span={12}>
                  {" "}
                  {getFieldDecorator("residence", {
                    initialValue: ["anhui", "maanshan", "ahut"],
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your habitual residence!"
                      }
                    ]
                  })(<Cascader options={residences} />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="技能">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("skills", {
                    rules: [
                      {
                        required: true,
                        message: "请输入您的技能!",
                        whitespace: true
                      }
                    ]
                  })(<Input />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  GitHub用户名&nbsp;
                  <Tooltip title="GitHub URL的最后一个路径?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("githubname", {
                    rules: []
                  })(<Input style={{ width: "100%" }} />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="个人简介">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("bio", {
                    rules: [
                      {
                        message: "请输入您的个人简介!",
                        whitespace: true
                      }
                    ]
                  })(<TextArea placeholder="对自己的一个简单的介绍" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="微博">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("weibo", {
                    rules: []
                  })(
                    <Input
                      addonBefore={<Icon type="weibo" />}
                      style={{ width: "100%" }}
                    />
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="微信">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("wechat", {
                    rules: []
                  })(
                    <Input
                      addonBefore={<Icon type="wechat" />}
                      style={{ width: "100%" }}
                    />
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>{" "}
            <FormItem {...formItemLayout} label="bilibili">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("bilibili", {
                    rules: []
                  })(
                    <Input
                      addonBefore={<Icon type="youtube" />}
                      style={{ width: "100%" }}
                    />
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="stack overflow">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("stackoverflow", {
                    rules: []
                  })(
                    <Input
                      addonBefore={<Icon type="codepen-circle" />}
                      style={{ width: "100%" }}
                    />
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="leetcode">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("leetcode", {
                    rules: []
                  })(
                    <Input
                      addonBefore={<Icon type="code" />}
                      style={{ width: "100%" }}
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
        </Layout>
      </Content>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  Form.create()(CreateProfile)
);
