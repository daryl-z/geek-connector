import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

// Store的主要功能就是：

// 维护应用的state内容
// 提供getState()方法获取 state
// 提供dispatch(action)方法更新 state
// 提供subscribe(listener)方法注册监听器
