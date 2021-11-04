import { combineReducers } from "redux";

// holds details for submitted values

const values = (state = [], action) => {
  switch (action.type) {
    case "SET_VALUES":
      return action.payload;
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  values,
});
