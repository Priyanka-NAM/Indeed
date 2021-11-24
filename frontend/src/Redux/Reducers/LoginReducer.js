import {
  JOBSEEKER_LOGIN 
  } from '../Constants/UserConstants';

const initialState = {
  isAuth: false,
  userDetails: {}
} 

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOBSEEKER_LOGIN:
        console.log("login reducer : ", action.payload)
        return { 
          ...state,
          isAuth: true,
          userDetails: action.payload
        };
      default:
        return state;
    }
  };