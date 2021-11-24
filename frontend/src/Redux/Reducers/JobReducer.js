import {
    FETCH_ALL_JOBS,
    ERROR
} from '../Constants/UserConstants';
  
const initialState = {
    allJobs: null,
    errorResponse: null
} 
  
export const jobReducer = (state = initialState, action) => {
      switch (action.type) {
        case FETCH_ALL_JOBS:
          console.log("jobs reducer : ", action.payload)
          return { 
            ...state,
            allJobs: action.payload  
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