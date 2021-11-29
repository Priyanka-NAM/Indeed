import {
  ALLUSER_SIGNUP,
  SIGNUP_ERROR
} from '../Constants/UserConstants';

const initialState = {
  isValid: false,
  isError: false,
  responseFromServer: null,
  errorResponse: null
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case ALLUSER_SIGNUP:
        return { 
          ...state,
          isValid: true,
          responseFromServer: action.payload, 
          };
      case SIGNUP_ERROR:
        return {
          ...state,
          isError: true,
          errorResponse: action.payload
        }
      default:
        return state;
    }
  };
