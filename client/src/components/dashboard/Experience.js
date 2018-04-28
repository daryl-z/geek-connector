import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profileActions";
import { Divider, Table, Icon } from "antd";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const columns = [
      {
        title: "公司",
        dataIndex: "company",
        key: "company",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "描述",
        dataIndex: "decription",
        key: "description"
      },
      {
        title: "起止日期",
        dataIndex: "years",
        key: "years"
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">删除</a>
          </span>
        )
      }
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park"
      },
      {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park"
      },
      {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park"
      }
    ];

    return (
      <div style={{ margin: "0 20px" }}>
        <Table
          columns={columns}
          dataSource={data}
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
