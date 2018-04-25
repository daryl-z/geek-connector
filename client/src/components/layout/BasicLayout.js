import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";

import GlobalHeader from "./GlobalHeader";
import IndexContent from "./IndexContent";
import GlobalFooter from "./GlobalFooter";
import Login from "../auth/login";
import Register from "../auth/register";

export default class BasicLayout extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Layout>
              <GlobalHeader />
              <Route exact path="/" component={IndexContent} />
              <div>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </div>
              <GlobalFooter />
            </Layout>
          </div>
        </Router>
      </Provider>
    );
  }
}
