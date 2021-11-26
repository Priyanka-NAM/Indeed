import {
  JOBSEEKER_LOGIN,
  LOGIN_ERROR,
  JOBSEEKER_LOGOUT
  } from '../Constants/UserConstants';

const initialState = {
  isAuth: false,
  userDetails: {},
  responseFromServer: null,
  errorResponse: null
} 

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOBSEEKER_LOGIN:
        return { 
          ...state,
          isAuth: true,
          userDetails: action.payload
        }
        case LOGIN_ERROR:
        return {
          ...state,
          errorResponse: action.payload
        }
        case JOBSEEKER_LOGOUT:
          return {
            ...state,
            isAuth: false
          }
      default:
        return state;
    }
  }; 