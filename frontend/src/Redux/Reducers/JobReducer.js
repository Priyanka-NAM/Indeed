import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    JOB_ERROR,
    POST_SAVED_JOBS,
    SAVED_JOB_ERROR
} from '../Constants/UserConstants';
  
const initialState = {
    allJobs: null,
    successResponse: null,
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
        case JOB_ERROR:
            return {
                ...state,
                serverResponse: action.payload
            }
        case POST_SAVED_JOBS:
          return {
            ...state,
            successResponse: action.payload
          }
        case SAVED_JOB_ERROR:
          return {
            ...state,
            errorResponse: action.payload
          }
        default:
          return state;
      }
    };