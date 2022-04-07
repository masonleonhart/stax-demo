import { combineReducers } from "redux";

const defaultState = {
  companyList: [],
  otherCompanyList: [],
  page: 0,
  searchValue: '',
  appliedFilter: ''
}

const discoverCompaniesListState = (state = {}, action) => {
  switch (action.type) {
    case "RESET_DISCOVER_STATE":
      return { ...defaultState };
    case "RESET_AND_SET_FILTER":
      return { ...defaultState, appliedFilter: action.payload, };
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
    case "SHOW_BCORP_ONLY":
      return {
        ...state,
        bCorpCompany: action.payload,
        companyList: [],
        otherCompanyList: [],
        page: 0,
      }
    case "SHOW_GABV_ONLY":
      return {
        ...state,
        gabvCompany: action.payload,
        companyList: [],
        otherCompanyList: [],
        page: 0,
      }
    case "SHOW_ONEPERCENT_ONLY":
      return {
        ...state,
        onePercentCompany: action.payload,
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
