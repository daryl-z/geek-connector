import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "antd";
const ButtonGroup = Button.Group;

class ProfileActions extends Component {
  render() {
    return (
      <ButtonGroup>
        <Button>
          <Link to={`/profile/${this.props.profile.handle}`}>
            <Icon type="bars" />查看全部信息
          </Link>
        </Button>
        <Button>
          <Link to="/edit-profile">
            <Icon type="edit" />编辑个人信息
          </Link>
        </Button>
        <Button>
          <Link to="/add-experience">
            <Icon type="edit" />添加工作经历
          </Link>
        </Button>
        <Button>
          <Link to="/add-education">
            <Icon type="edit" />添加教育经历
          </Link>
        </Button>
      </ButtonGroup>
    );
  }
}

export default ProfileActions;
