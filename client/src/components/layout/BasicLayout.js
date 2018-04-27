import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { logoutUser } from "../../actions/authActions";
import { setCurrentUser } from "../../actions/authActions";
import store from "../../store";

import GlobalHeader from "./GlobalHeader";
import IndexContent from "./IndexContent";
import GlobalFooter from "./GlobalFooter";
import Login from "../auth/login";
import Register from "../auth/register";

// check for token
if (localStorage.jwtToken) {
  // 设置头部验证
  setAuthToken(localStorage.jwtToken);
  // 解码token获取用户信息
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

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
