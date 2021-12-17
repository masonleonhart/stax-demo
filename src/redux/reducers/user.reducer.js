import { combineReducers } from "redux";

// holds details for submitted values

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return action.payload;
    default:
      return state;
  }
};

const values = (state = [], action) => {
  switch (action.type) {
    case "SET_VALUES":
      return action.payload;
    case "RESET_VALUES":
      return [];
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  userInfo,
  values,
});
