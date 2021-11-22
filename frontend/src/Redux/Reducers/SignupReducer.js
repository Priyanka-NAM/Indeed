import {
  JOBSEEKER_SIGNUP,
  ERROR
} from '../Constants/UserConstants';

const initialState = {
  responseFromServer: null,
  errorResponse: null
}

export const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOBSEEKER_SIGNUP:
        return { 
          ...state,
          responseFromServer: action.payload, 
          };
      case ERROR:
        return {
          ...state,
          errorResponse: action.payload
        }
      default:
        return state;
    }
  };
  