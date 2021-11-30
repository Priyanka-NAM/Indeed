import {
  ALLUSER_LOGIN,
  LOGIN_ERROR,
  JOBSEEKER_LOGOUT,
  EMPLOYER_LOGOUT,
} from "../Constants/UserConstants";

const initialState = {
  isAuth: false,
  userDetails: {},
  errorResponse: null,
  accErr: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLUSER_LOGIN:
      return {
        ...state,
        isAuth: true,
        userDetails: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        accErr: true,
        errorResponse: action.payload,
      };
    case JOBSEEKER_LOGOUT:
      return {
        ...state,
        userDetails: {},
        isAuth: false,
      };
    case EMPLOYER_LOGOUT:
      return {
        ...state,
        userDetails: {},
        isAuth: false,
      };
    default:
      return state;
  }
};
