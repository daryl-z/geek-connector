import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { logoutUser } from "../../actions/authActions";
import { setCurrentUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import store from "../../store";
import GlobalHeader from "./GlobalHeader";
import IndexContent from "./IndexContent";
import GlobalFooter from "./GlobalFooter";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "../common/PrivateRoute";
import CreateProfile from "../create-profile/CreateProfile";
import EditProfile from "../edit-profile/EditProfile";
import AddExperience from "../add-credentials/AddExperience";
import AddEducation from "../add-credentials/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";

// check for token
if (localStorage.jwtToken) {
  // 设置头部验证
  setAuthToken(localStorage.jwtToken);
  // 解码token获取用户信息
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // 登出并移除简介
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
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
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                </Switch>
              </div>
              <GlobalFooter />
            </Layout>
          </div>
        </Router>
      </Provider>
    );
  }
}
