import {
  CUSTOMER_LOGIN 
  } from '../Constants/UserConstants';

const initialState = {
  isAuth: false
} 

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case CUSTOMER_LOGIN:
        return { 
          ...state,
          isAuth: true  
        };
      default:
        return state;
    }
  };