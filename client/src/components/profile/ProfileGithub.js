import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { List, Card } from "antd";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "26c196bacea7db10cf48",
      clientSecret: "0885cb690e07d2a93a6afb0891fb552fd9f7aa53",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
          console.log(data);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    return (
      <div ref="myRef" style={{ marginTop: "20px" }}>
        <Card title={`GitHub`} bordered={false}>
          <List
            itemLayout="horizontal"
            dataSource={repos}
            renderItem={repo => (
              <List.Item key={repo.id}>
                <List.Item.Meta
                  title={
                    <Link to={repo.html_url} target="_blank">
                      {repo.name}
                    </Link>
                  }
                  description={repo.description}
                />

                <div>
                  <span>Stars: {repo.stargazers_count}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Watchers: {repo.watchers_count}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>Forks: {repo.forks_count}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
