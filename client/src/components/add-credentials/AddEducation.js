import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";
import {
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  Layout,
  DatePicker
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const { Content } = Layout;
const RangePicker = DatePicker.RangePicker;

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
      if (!err) {
        const rangeValue = fieldsValue["range-picker"];
        const values = {
          ...fieldsValue,
          from: rangeValue[0].format("YYYY-MM-DD"),
          to: rangeValue[1].format("YYYY-MM-DD")
        };
        console.log("Received values of form: ", values);
        this.props.addEducation(values, this.props.history);
      }
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  handleChange = value => {
    console.log(`selected ${value}`);
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

    // 起止日期配置
    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "请选择时间!" }]
    };

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>添加教育信息</h1>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="学校名称">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("school", {
                    rules: [
                      {
                        required: true,
                        message: "请选择您的学校!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="请输入学校名称" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="专业名称">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("fieldofstudy", {
                    rules: [
                      {
                        required: true,
                        message: "请输入您的专业名称!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="请输入专业名称" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>

            <FormItem {...formItemLayout} label="学位">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("degree", {
                    rules: [
                      {
                        required: true,
                        message: "请选择您的学位信息!"
                      }
                    ],
                    initialValue: "学士"
                  })(
                    <Select
                      style={{ width: "100%" }}
                      onChange={this.handleChange}
                      placeholder="请选择"
                    >
                      <Option value="chuzhong">初中</Option>
                      <Option value="gaozhong">高中</Option>
                      <Option value="daxue">学士</Option>
                      <Option value="shuoshi">硕士</Option>
                      <Option value="boshi">博士</Option>
                      <Option value="other">其他</Option>
                    </Select>
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="起止日期">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("range-picker", rangeConfig)(
                    <RangePicker style={{ width: "100%" }} />
                  )}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="描述">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("description", {
                    rules: []
                  })(<TextArea placeholder="对这段经历简单的描述" />)}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(Form.create()(AddEducation))
);
