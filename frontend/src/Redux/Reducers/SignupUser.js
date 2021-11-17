import {
    CUSTOMER_SIGNUP_REQUEST,
    CUSTOMER_SIGNUP_FAIL,
    CUSTOMER_SIGNUP_SUCCESS, 
  } from '../Constants/UserConstants';

const initialState = {
  loadingFromState: null,
  successFromState: null,
  errorFromState: null,
  isAuth: false
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case CUSTOMER_SIGNUP_REQUEST:
        return { 
          ...state,
          loadingFromState: true, 
          successFromState: false };
      case CUSTOMER_SIGNUP_SUCCESS:
        return {
          ...state,
          loadingFromState: false,
          successFromState: true,
        };
      case CUSTOMER_SIGNUP_FAIL:
        return {
          ...state, 
          loadingFromState: false,
          errorFromState: action.payload, 
          successFromState: false };
      default:
        return state;
    }
  };
  