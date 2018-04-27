import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser } from "../../actions/authActions";
import store from "../../store";

import GlobalHeader from "./GlobalHeader";
import IndexContent from "./IndexContent";
import GlobalFooter from "./GlobalFooter";
import Login from "../auth/login";
import Register from "../auth/register";

// check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
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
