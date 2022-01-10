import { combineReducers } from "redux";

// defer to hooks for holding state rather than making reducers
// react useContext https://reactjs.org/docs/context.html
// https://stackoverflow.com/questions/58060118/usecontext-in-react-native
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

// holds details for submitted values

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return action.payload;
    default:
      return state;
  }
};

const userValues = (state = [], action) => {
  switch (action.type) {
    case "SET_USER_VALUES":
      return action.payload;
    case "RESET_USER_VALUES":
      return [];
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  userInfo,
  userValues,
});
