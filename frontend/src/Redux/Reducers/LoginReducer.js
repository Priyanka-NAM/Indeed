import {
  JOBSEEKER_LOGIN,
  LOGIN_ERROR,
  JOBSEEKER_LOGOUT,
  EMPLOYER_LOGOUT,
} from "../Constants/UserConstants";

const initialState = {
  isAuth: false,
  userDetails: {},
  responseFromServer: null,
  errorResponse: null,
  accErr: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOBSEEKER_LOGIN:
      return {
        ...state,
        isAuth: true,
        accErr: false,
        userDetails: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isAuth: false,
        accErr: true,
        errorResponse: action.payload,
      };
    case JOBSEEKER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    case EMPLOYER_LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
