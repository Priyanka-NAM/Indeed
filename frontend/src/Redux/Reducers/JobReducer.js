import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    FETCH_Q_JOBS,
    JOB_ERROR,
    POST_SAVED_JOBS,
    DELETE_SAVED_JOBS,
    GET_SAVED_JOBS,
    GET_USER_REVIEWS,
    REVIEW_ERROR,
    APPLY_JOB
} from '../Constants/UserConstants';

import { GET_JOB_APPLICANTS_REQUEST, GET_JOB_APPLICANTS_SUCCESS, GET_JOB_APPLICANTS_RESET, GET_JOB_APPLICANTS_FAIL } from '../Constants/JobConstants';
  
const initialState = {
    allJobs: null,
    successResponse: null, 
    errorResponse: null,
    queriedJobs: null,
    savedJobs: null,
    reviews: null,
    queriedJobsLength: 0
} 
  
export const jobReducer = (state = initialState, action) => {
      switch (action.type) {
        case FETCH_ALL_JOBS:
          return { 
            ...state,
            allJobs: action.payload  
          };
        case FETCH_QUERIED_JOBS:
          return { 
            ...state,
            queriedJobs: action.payload,
          };
        case FETCH_Q_JOBS:
          return {
            ...state, 
            queriedJobsLength: action.payload.length
          }
        case GET_USER_REVIEWS: {
          return {
            ...state,
            reviews: action.payload
          }
        }
        case REVIEW_ERROR:
          return {
            ...state,
            errorResponse: action.payload
          }
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

export const jobApplicantsReducer = (state = {applicants: []}, action) => {

    switch(action.type){
        case GET_JOB_APPLICANTS_REQUEST:
            return { applicants: []}
        case GET_JOB_APPLICANTS_SUCCESS:
            return { applicants: action.payload }
        case GET_JOB_APPLICANTS_FAIL:
            return { error: action.payload }
        case GET_JOB_APPLICANTS_RESET:
            return { applicants: [] }
        default:
            return state
    }
}