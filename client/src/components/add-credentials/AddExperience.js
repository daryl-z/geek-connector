import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";
import options from "../common/cascader-address-options";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Layout,
  DatePicker,
  Cascader,
  Checkbox
} from "antd";

const FormItem = Form.Item;

const { TextArea } = Input;
const { Content } = Layout;
const RangePicker = DatePicker.RangePicker;

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: false
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
        if (this.state.current === false) {
          const rangeValue = fieldsValue["range-picker"];
          const values = {
            ...fieldsValue,
            from: rangeValue[0].format("YYYY-MM-DD"),
            to: rangeValue[1].format("YYYY-MM-DD")
          };
          console.log("Received values of form: ", values);
          this.props.addExperience(values, this.props.history);
        } else if (this.state.current === true) {
          const rangeValue = fieldsValue["range-picker"];
          const values = {
            ...fieldsValue,
            from: rangeValue[0].format("YYYY-MM-DD"),
            to: ""
          };
          console.log("Received values of form: ", values);
          this.props.addExperience(values, this.props.history);
        }
      }
    });
  };

  onCheck = e => {
    this.setState({
      current: !this.state.current
    });
  };

  render() {
    // const { errors } = this.state;

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

    // 起止日期配置
    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "请选择时间!" }]
    };

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>添加工作经历</h1>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="经历概况">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,
                        message: "该项不能为空",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="比如职位什么的" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="公司名称">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("company", {
                    rules: [
                      {
                        required: true,
                        message: "请输入您的公司名称!",
                        whitespace: true
                      }
                    ]
                  })(<Input placeholder="公司名称" />)}
                </Col>
                <Col span={12} />
              </Row>
            </FormItem>
            <FormItem {...formItemLayout} label="工作地点">
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("location", {
                    initialValue: ["34", "3405", "340504"],
                    rules: [
                      {
                        type: "array",
                        message: "请选择您的工作地点"
                      }
                    ]
                  })(<Cascader options={options} />)}
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
            <FormItem {...tailFormItemLayout}>
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator("current", {
                    initialValue: this.state.current
                  })(
                    <Checkbox
                      checked={this.state.current}
                      onChange={this.onCheck}
                    >
                      直到现在
                    </Checkbox>
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(
  withRouter(Form.create()(AddExperience))
);
