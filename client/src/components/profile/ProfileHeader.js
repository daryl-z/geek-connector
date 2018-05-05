import React, { Component } from "react";
import { Card, Icon, Avatar } from "antd";
import isEmpty from "../../validation/is-empty";
import getLocation from "../common/get-location";

const { Meta } = Card;

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <Card style={{ width: "100%" }} bordered={false}>
        <Meta
          avatar={<Avatar src={profile.user.avatar} />}
          title={profile.user.name}
          description={
            isEmpty(profile.company) ? null : (
              <div>
                <div>
                  {profile.status} <span>at {profile.company}</span>
                  {isEmpty(profile.location) ? null : (
                    <p>{getLocation(profile.location).join("-")}</p>
                  )}
                </div>
                <p>
                  {isEmpty(profile.website) ? null : (
                    <a href={profile.website} target="_blank" title="website">
                      <Icon type="cloud" />&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.bili) ? null : (
                    <a
                      href={profile.social.bili}
                      target="_blank"
                      title="bilibili"
                    >
                      <Icon type="youtube" />&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.weibo) ? null : (
                    <a
                      href={profile.social.weibo}
                      target="_blank"
                      title="weibo"
                    >
                      <Icon type="weibo" />&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.wechat) ? null : (
                    <a title={profile.social.wechat}>
                      <Icon type="wechat" /> &nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  )}

                  {isEmpty(profile.social && profile.social.leetcode) ? null : (
                    <a
                      href={profile.social.leetcode}
                      target="_blank"
                      title="leetcode"
                    >
                      <Icon type="code" />&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  )}

                  {isEmpty(
                    profile.social && profile.social.stackoverflow
                  ) ? null : (
                    <a
                      href={profile.social.stackoverflow}
                      target="_blank"
                      title="Stack Overflow"
                    >
                      <Icon type="codepen-circle" />&nbsp;&nbsp;&nbsp;&nbsp;
                    </a>
                  )}
                </p>
              </div>
            )
          }
        />
      </Card>
    );
  }
}

export default ProfileHeader;
