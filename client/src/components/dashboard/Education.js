import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profileActions";
import { Table, Popconfirm, message, Button } from "antd";
import Moment from "react-moment";

class Education extends Component {
  // onDeleteClick = id => {
  //   this.props.deleteEducation(id);
  // };
  render() {
    const { deleteEducation } = this.props;
    const popContent = "你确定要删除此项吗?";

    function confirm(id) {
      deleteEducation(id);
      message.info("删除成功");
    }

    const columns = [
      {
        title: "学校",
        dataIndex: "school",
        key: "school",
        render: text => <a href="">{text}</a>
      },
      {
        title: "学位",
        dataIndex: "degree",
        key: "degree"
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
            {/* <a
              href="javascript:;"
              onClick={() => this.onDeleteClick(text.action)}
            > */}
            <Popconfirm
              placement="left"
              title={popContent}
              onConfirm={() => confirm(text.action)}
              okText="是"
              cancelText="否"
            >
              <Button>删除</Button>
            </Popconfirm>
          </span>
        )
      }
    ];

    const education = this.props.education.map(edu => ({
      school: edu.school,
      degree: edu.degree,
      years: [edu.from, edu.to],
      action: edu._id,
      key: edu._id
    }));

    return (
      <div style={{ margin: "0 20px" }}>
        <Table
          columns={columns}
          dataSource={education}
          title={() => <h2>教育经历</h2>}
        />
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
