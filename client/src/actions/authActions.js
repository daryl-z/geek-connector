import { TEST_DISPATCH } from "./types";
// Register actionCreator
export const registerUser = userData => {
  return {
    type: TEST_DISPATCH,
    payload: userData
  };
};
