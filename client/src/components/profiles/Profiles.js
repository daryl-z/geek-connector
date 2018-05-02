import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Spin, Row, Col, Card, Avatar, Layout } from "antd";

import { getProfiles } from "../../actions/profileActions";
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
    let profileItems;
    // console.log(profiles);

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
          <Col span={8} key={profile._id}>
            <Card
              title={
                <div>
                  <Avatar src={profile.user.avatar} />
                  &nbsp;
                  {profile.user.name}
                </div>
              }
              bordered={true}
              style={{ height: "300px", marginBottom: "20px" }}
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
                <Link to={`/profile/${profile.handle}`}>查看简介</Link>
              </div>
              <div>
                <h4>技能点</h4>
                <ul>
                  {profile.skills
                    .slice(0, 4)
                    .map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
              </div>
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
            <h1>其他开发者</h1>
            <p>为您推荐更多的开发者</p>
            <Row gutter={16}>{profileItems} </Row>
          </div>
        </Layout>
      </Content>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
