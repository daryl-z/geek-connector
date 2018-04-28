import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import options from "../common/cascader-address-options";
import isEmpty from "../../validation/is-empty";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Button,
  AutoComplete,
  Layout
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const { Content } = Layout;

class EditProfile extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    weibo: "",
    wechat: "",
    bili: "",
    stackoverflow: "",
    leetcode: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.weibo = !isEmpty(profile.social.weibo)
        ? profile.social.weibo
        : "";
      profile.wechat = !isEmpty(profile.social.wechat)
        ? profile.social.wechat
        : "";
      profile.stackoverflow = !isEmpty(profile.social.stackoverflow)
        ? profile.social.stackoverflow
        : "";
      profile.bili = !isEmpty(profile.social.bili) ? profile.social.bili : "";
      profile.leetcode = !isEmpty(profile.social.leetcode)
        ? profile.social.leetcode
        : "";

      // // Set component fields state

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        weibo: profile.weibo,
        wechat: profile.wechat,
        bili: profile.bili,
        stackoverflow: profile.stackoverflow,
        leetcode: profile.leetcode
      });
    }
  }
  // // Set component fields state

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.createProfile(values, this.props.history);
      }
    });
  };
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  handleFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields }
    }));
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
                        message: "请输入简介的名称!",
                        whitespace: true
                      }
                    ],
                    initialValue: this.state.handle
                  })(
                    <Input
                      placeholder="简介的唯一标识,可通过url访问该简介"
                      disabled
                    />
                  )}
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
                    ],
                    initialValue: this.state.status
                  })(
                    <Select
                      style={{ width: "100%" }}
                      onChange={this.handleChange}
                      placeholder="请选择工作状态"
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
                    rules: [],
                    initialValue: this.state.company
                  })(<Input placeholder="请输入公司名称" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="个人主页">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("website", {
                    rules: [],
                    initialValue: this.state.website
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
                  {getFieldDecorator("location", {
                    initialValue: ["34", "3405", "340504"],
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "请选择您的居住地"
                      }
                    ],
                    initialValue: this.state.location
                  })(<Cascader options={options} />)}
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
                    ],
                    initialValue: this.state.skills
                  })(
                    <Input placeholder="请输入技能名称，请用逗号隔开etc:CSS,JS,HTML" />
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  GitHub用户名&nbsp;
                  <Tooltip title="GitHub URL的最后一个路径">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("githubusername", {
                    rules: [],
                    initialValue: this.state.githubusername
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="GitHub 用户名"
                    />
                  )}
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
                    ],
                    initialValue: this.state.bio
                  })(<TextArea placeholder="对自己的一个简单的介绍" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="微博">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("weibo", {
                    rules: [],
                    initialValue: this.state.weibo
                  })(
                    <Input
                      addonBefore={<Icon type="weibo" />}
                      style={{ width: "100%" }}
                      placeholder="微博"
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
                    rules: [],
                    initialValue: this.state.wechat
                  })(
                    <Input
                      placeholder="微信"
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
                  {getFieldDecorator("bili", {
                    rules: [],
                    initialValue: this.state.bili
                  })(
                    <Input
                      addonBefore={<Icon type="youtube" />}
                      style={{ width: "100%" }}
                      placeholder="bilibili"
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
                    rules: [],
                    initialValue: this.state.stackoverflow
                  })(
                    <Input
                      addonBefore={<Icon type="codepen-circle" />}
                      style={{ width: "100%" }}
                      placeholder="Stack Overflow"
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
                    rules: [],
                    initialValue: this.state.leetcode
                  })(
                    <Input
                      addonBefore={<Icon type="code" />}
                      style={{ width: "100%" }}
                      placeholder="LeetCode"
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(Form.create()(EditProfile))
);
