import React, { Component } from "react";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { logoutUser } from "./actions/authActions";
import { setCurrentUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
import BasicLayout from "./components/layout/BasicLayout";

// 检查token
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

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BasicLayout />
        </div>
      </Provider>
    );
  }
}

export default App;
