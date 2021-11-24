import {
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
} from "../Constants/CompanyReviewConstants";

const initialState = {
  companyNames: [],
  success: false,
};

export const companyReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANY_SUCCESS:
      console.log("login reducer : ", action.payload);
      return {
        companyNames: action.payload.companyNames,
        success: true,
      };
    case FETCH_COMPANY_FAILURE:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
