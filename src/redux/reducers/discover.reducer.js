import { combineReducers } from "redux";

const discoverCompaniesListState = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH_COMPANY":
      if (action.payload == state.searchValue) {
        return state;
      }
      return {
        ...state,
        searchValue: action.payload,
        companyList: [],
        otherCompanyList: [],
        page: 0,
      };
    case "SET_FILTER_LIST":
      if (action.payload == state.appliedFilter) {
        return state;
      }
      return {
        ...state,
        appliedFilter: action.payload,
        companyList: [],
        otherCompanyList: [],
        page: 0,
      };
    case "RESET_FILTER_LIST":
      return {
        ...state,
        appliedFilter: [],
        companyList: [],
        otherCompanyList: [],
        page: 0,
      };
    case "SET_DISCOVER_COMPANY_LIST":
      return {
        ...state,
        loading: false,
        companyList: action.payload,
      };
    case "SET_OTHER_DISCOVER_COMPANY_LIST":
      return {
        ...state,
        loading: false,
        otherCompanyList: action.payload,
      }
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
    case "SHOW_FAVORITES_ONLY":
      return {
        ...state,
        favCompanyOnly: action.payload,
        companyList: [],
        otherCompanyList: [],
        page: 0,
      }
    default:
      return state;
  }
};

// Combines all of our redcuers to be exported to _root.reducer

export default combineReducers({
  discoverCompaniesListState,
});
