import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profileActions";
import { Table, Popconfirm, message } from "antd";
import Moment from "react-moment";

class Experience extends Component {
  render() {
    const { deleteExperience } = this.props;
    const popContent = "你确定要删除此项吗?";

    function confirm(id) {
      deleteExperience(id);
      message.info("删除成功");
    }

    const columns = [
      {
        title: "公司",
        dataIndex: "company",
        key: "company",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "起止日期",
        dataIndex: "years",
        key: "years",
        render: (text, record, index) => (
          <div>
            <Moment format="YYYY/MM/DD">{text.from}</Moment> -
            {text.to === null ? (
              " Now"
            ) : (
              <Moment format="YYYY/MM/DD">{text.to}</Moment>
            )}
          </div>
        )
      },
      {
        title: "操作",
        key: "action",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              placement="left"
              title={popContent}
              onConfirm={() => confirm(text.action)}
              okText="是"
              cancelText="否"
            >
              <a style={{ color: "red" }}>删除</a>
            </Popconfirm>
          </span>
        )
      }
    ];

    const experience = this.props.experience.map(exp => ({
      company: exp.company,
      title: exp.title,
      years: [exp.from, exp.to],
      action: exp._id,
      key: exp._id
    }));

    return (
      <div style={{ margin: "0 20px" }}>
        <Table
          columns={columns}
          dataSource={experience}
          title={() => <h2>工作经历</h2>}
        />
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
