/* eslint-disable default-case */
import {
    COMPANY_LIST_SUCCESS,
    COMPANY_LIST_FAIL,
    COMPANY_LIST_REVIEWS_SUCCESS,
    COMPANY_LIST_REVIEWS_FAIL,
  } from '../Constants/Company';
  
  const initialState = {
    responseFromServer: null,
    errorResponse: null
  }

export const CompanyDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_LIST_SUCCESS:
        return { 
            ...state,
            responseFromServer: action.payload, 
            };
    case COMPANY_LIST_FAIL:
        return {
            ...state,
            errorResponse: action.payload
          };
    default:
      return { ...state };
  }
};
const initialState1 = {
  companySpecificReviews: null,
  companySpecificReviewsError: null
}

export const CompanyListReviewReducer = (state = initialState1, action) => {
  switch (action.type) {
    case COMPANY_LIST_REVIEWS_SUCCESS:
        return { 
            ...state,
            companySpecificReviews: action.payload, 
            };
    case COMPANY_LIST_REVIEWS_FAIL:
        return {
            ...state,
            companySpecificReviewsError: action.payload
          };
    default:
      return { ...state };
  }
};