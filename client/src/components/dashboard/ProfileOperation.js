import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "antd";
const ButtonGroup = Button.Group;

const ProfileActions = () => {
  return (
    <ButtonGroup>
      <Button type="primary">
        <Link to="/edit-profile">
          <Icon type="edit" />编辑个人信息
        </Link>
      </Button>
      <Button type="primary">
        <Link to="/edit-experience">
          <Icon type="edit" />编辑工作经历
        </Link>
      </Button>
      <Button type="primary">
        <Link to="/edit-education">
          <Icon type="edit" />编辑教育经历
        </Link>
      </Button>
    </ButtonGroup>
  );
};

export default ProfileActions;
