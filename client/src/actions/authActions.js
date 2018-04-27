import axios from "axios";
import { GET_ERRORS } from "./types";
// Register actionCreator
export const registerUser = (userData, history) => dispatch => {
  // 返回的 Action 会由 Redux 自动发出
  axios
    .post("/api/users/register", userData)
    .then(res => console.log(res.data))
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
