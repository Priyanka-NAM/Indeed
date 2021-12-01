import {
  EMPLOYER_ALL_JOBS,
  EMPLOYER_ALL_JOBS_ERROR,
  EMPLOYER_LOGOUT,
} from "../Constants/UserConstants";

const initialState = {
  errorResponse: null,
  responseFromServer: [],
};

export const employerJobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYER_ALL_JOBS:
      return {
        ...state,
        responseFromServer: action.payload,
      };
    case EMPLOYER_ALL_JOBS_ERROR:
      return {
        ...state,
        errorResponse: action.payload,
      };
    case EMPLOYER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
