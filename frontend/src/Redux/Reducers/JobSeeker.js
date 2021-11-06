import {
    CUSTOMER_SIGNUP_REQUEST,
    CUSTOMER_SIGNUP_FAIL,
    CUSTOMER_SIGNUP_SUCCESS,
  } from '../Constants/JobSeeker';

export const signUpReducer = (state = {}, action) => {
    switch (action.type) {
      case CUSTOMER_SIGNUP_REQUEST:
        return { loadingFromState: true, successFromState: false };
      case CUSTOMER_SIGNUP_SUCCESS:
        return {
          loadingFromState: false,
          successFromState: true,
        };
      case CUSTOMER_SIGNUP_FAIL:
        return { loadingFromState: false, errorFromState: action.payload, successFromState: false };
      default:
        return state;
    }
  };