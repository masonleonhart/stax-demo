import { combineReducers } from "redux";

const discoverCompaniesListState = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_COMPANY":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "SET_FILTER_LIST":
      return {
        ...state,
        appliedFilter: action.payload,
        companyList: [],
        page: 0,
      };
    case "SET_DISCOVER_COMPANY_LIST":
      return {
        ...state,
        loading: false,
        companyList: action.payload,
      };

    case "DISCOVER_COMPANY_LIST_LOADING_STOP":
      return {
        ...state,
        loading: false,
      };

    case "INCREASE_PAGE_NO":
      return {
        ...state,
        page: (state.page ?? 0) + 1,
      };

    case "DISCOVER_COMPANY_LIST_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DISCOVER_COMPANY_LIST_LOADING_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  discoverCompaniesListState,
});
