import {
  EMPLOYER_DETAILS_ADD,
  EMPLOYER_DETAILS_ERROR,
  EMPLOYER_DETAILS_GET_ERROR,
  EMPLOYER_DETAILS_GET,
} from "../Constants/UserConstants";

const initialState = {
  responseFromServer: null,
  errorResponse: null,
  employerID: "",
  employerName: "",
  website: "",
  companyType: "",
  aboutTheCompany: {
    revenue: "",
    headQuarters: "",
    industry: "",
    founded: "",
    misssionandvisson: "",
    ceo: "",
    description: "",
    companySize: "",
    workCulture: "",
    companyValues: "",
  },
};

export const employerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYER_DETAILS_ADD:
      return {
        ...state,
        responseFromServer: action.payload,
      };
    case EMPLOYER_DETAILS_ERROR:
      return {
        ...state,
        errorResponse: action.payload,
      };
    case EMPLOYER_DETAILS_GET:
      return {
        ...state,
        responseFromServer: action.payload,
      };
    case EMPLOYER_DETAILS_GET_ERROR:
      return {
        ...state,
        errorResponse: action.payload,
      };
    default:
      return state;
  }
};
