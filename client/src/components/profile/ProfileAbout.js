import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Card } from "antd";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name
      ? profile.user.name.trim().split(" ")[0]
      : "";

    // Skill List
    const skills = profile.skills.map((skill, index) => (
      <span key={index.toString()}>{skill}&nbsp;&nbsp;&nbsp;&nbsp;</span>
    ));

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card title={`用户${firstName}的简介`} bordered={false}>
            {isEmpty(profile.bio) ? (
              <span>{firstName} 很懒，都没有写自己的简介</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="掌握的技能" bordered={false}>
            {skills}
          </Card>
        </Col>
      </Row>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
