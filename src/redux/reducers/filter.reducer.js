import { combineReducers } from "redux";

const filterListvaluesList = (state = [], action) => {
  switch (action.type) {
    case "SET_FILTER_LIST":
      return action.payload;
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  filterListvaluesList,
});
