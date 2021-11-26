import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    ERROR
} from '../Constants/UserConstants';
  
const initialState = {
    allJobs: null,
    errorResponse: null,
    queriedJobs: null
} 
  
export const jobReducer = (state = initialState, action) => {
      switch (action.type) {
        case FETCH_ALL_JOBS:
          console.log("jobs reducer : ", action.payload)
          return { 
            ...state,
            allJobs: action.payload  
          };
        case FETCH_QUERIED_JOBS:
          console.log("jobs reducer : ", action.payload)
          return { 
            ...state,
            queriedJobs: action.payload  
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