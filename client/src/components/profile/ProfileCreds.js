import React, { Component } from "react";
import Experience from "../dashboard/Experience";
import Education from "../dashboard/Education";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;
    return (
      <div className="row">
        <Experience experience={experience} />
        <Education education={education} />
      </div>
    );
  }
}

export default ProfileCreds;
