import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // 如果token存在 应用到每个请求
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //否则删除验证头部 删除auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
