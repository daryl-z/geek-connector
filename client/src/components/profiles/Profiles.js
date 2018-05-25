import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Spin,
  Row,
  Col,
  Card,
  Avatar,
  Layout,
  Tag,
  Icon,
  Popconfirm,
  message
} from "antd";

import { getProfiles, deleteUser } from "../../actions/profileActions";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import getLocation from "../common/get-location";

const { Content } = Layout;

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { deleteUser } = this.props;
    let profileItems;
    // console.log(profiles);
    const popContent = "你确定要删除此项吗?";

    function confirm(id) {
      deleteUser(id);
      message.info("删除成功");
    }

    if (profiles === null || loading) {
      profileItems = (
        <Row>
          <Col span={11} />
          <Col span={2}>
            <Spin tip="正在加载..." />
          </Col>
          <Col span={11} />
        </Row>
      );
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <Col span={6} key={profile._id}>
            <Card
              title={
                <div>
                  <Avatar src={profile.user.avatar} />
                  &nbsp;
                  {profile.user.name}
                </div>
              }
              extra={
                this.props.extra && (
                  <Popconfirm
                    placement="left"
                    title={popContent}
                    onConfirm={() => confirm(profile.user._id)}
                    // onConfirm={() => console.log(profile.user)}
                    okText="是"
                    cancelText="否"
                  >
                    <a style={{ color: "red" }}>删除</a>
                  </Popconfirm>
                )
              }
              bordered={true}
              actions={[
                <Link to={`/profile/${profile.handle}`}>查看简介</Link>
              ]}
              style={{ maxHeight: "300px", marginBottom: "20px" }}
            >
              <div>
                <p>
                  {profile.status}
                  {isEmpty(profile.company) ? null : (
                    <span> at {profile.company}</span>
                  )}
                </p>
                {isEmpty(profile.location) ? null : (
                  <p>{getLocation(profile.location).join("-")}</p>
                )}
              </div>
              <Row>
                <Col span={4}>
                  <h3>技能点:</h3>
                </Col>
                <Col span={20}>
                  {profile.skills.slice(0, 4).map((skill, index) => (
                    <Tag color="blue" key={index}>
                      {skill}
                    </Tag>
                  ))}
                </Col>
              </Row>
            </Card>
          </Col>
        ));
      } else {
        profileItems = <h4>未加载到任何用户</h4>;
      }
    }

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 20px", background: "#fff" }}>
          <div>
            <h1>{this.props.title}</h1>
            <p>{this.props.details}</p>
            <Row gutter={16}>{profileItems} </Row>
          </div>
        </Layout>
      </Content>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, deleteUser })(Profiles);
