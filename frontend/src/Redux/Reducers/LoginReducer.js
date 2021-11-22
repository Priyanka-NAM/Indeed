import {
  JOBSEEKER_LOGIN 
  } from '../Constants/UserConstants';

const initialState = {
  isAuth: false
} 

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case JOBSEEKER_LOGIN:
        console.log("login reducer : ", action.payload)
        return { 
          ...state,
          isAuth: true  
        };
      default:
        return state;
    }
  };