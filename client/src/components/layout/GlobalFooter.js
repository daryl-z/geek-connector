import React, { Component } from "react";
import { Layout } from "antd";
const { Footer } = Layout;

export default class GlobalFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: "center" }}>
        Dev Player Copyright &copy; {new Date().getFullYear()} Created by
        <a href="https://github.com/Angelki"> Angelki</a>
      </Footer>
    );
  }
}
