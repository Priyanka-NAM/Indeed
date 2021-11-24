/* eslint-disable default-case */
import {
    COMPANY_LIST_SUCCESS,
    COMPANY_LIST_FAIL,
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