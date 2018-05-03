import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import { Spin, Layout, Col, Row, Card, Icon } from "antd";
import { getProfileByHandle } from "../../actions/profileActions";

const { Content } = Layout;

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = (
        <Row>
          <Col span={11} />
          <Col span={2}>
            <Spin tip="正在加载..." />
          </Col>
          <Col span={11} />
        </Row>
      );
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }

    return (
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: "#fff" }}>
          <Link to="/dashboard" style={{ margin: "0 20px" }}>
            我的个人中心
          </Link>
          <Card
            bordered={false}
            style={{ margin: "0 20px" }}
            extra={<Icon type="ellipsis" />}
            title={
              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4>个人简介</h4>
              </div>
            }
          >
            {profileContent}
          </Card>
        </Layout>
      </Content>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
