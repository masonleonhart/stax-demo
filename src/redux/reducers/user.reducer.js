import { combineReducers } from "redux";

// defer to hooks for holding state rather than making reducers
// react useContext https://reactjs.org/docs/context.html
// https://stackoverflow.com/questions/58060118/usecontext-in-react-native
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

// holds details for submitted values

const personalName = (state = { first_name: "", last_name: "" }, action) => {
  switch (action.type) {
    case "SET_PERSONAL_NAME":
      return action.payload;
    default:
      return state;
  }
};

const email = (state = "", action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return action.payload;
    default:
      return state;
  }
};

const valuesQuizSelection = (state = [], action) => {
  switch (action.type) {
    case "SET_QUIZ_SELECTION":
      return action.payload;
    case "RESET_QUIZ_SELECTION":
      return [];
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  personalName,
  email,
  valuesQuizSelection
});
