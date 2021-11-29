import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    JOB_ERROR,
    POST_SAVED_JOBS,
    DELETE_SAVED_JOBS,
    GET_SAVED_JOBS,
    APPLY_JOB
} from '../Constants/UserConstants';
  
const initialState = {
    allJobs: null,
    successResponse: null, 
    errorResponse: null,
    queriedJobs: null,
    savedJobs: null
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
        case POST_SAVED_JOBS:
          return {
            ...state,
            successResponse: action.payload
          }
        case GET_SAVED_JOBS:
          return {
            ...state,
            savedJobs: action.payload
          }
        case DELETE_SAVED_JOBS:
          return {
            ...state,
            successResponse: action.payload
          }
        case APPLY_JOB:
          return {
            ...state,
            successResponse: action.payload
          }
        case JOB_ERROR:
          return {
            ...state,
            errorResponse: action.payload
          }
        default:
          return state;
      }
    };