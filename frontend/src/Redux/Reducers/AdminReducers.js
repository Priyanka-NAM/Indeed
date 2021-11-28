/* eslint-disable default-case */
import {
    ADMIN_TOP_MOST_REVIEWED_SUCCESS,
    ADMIN_TOP_MOST_REVIEWED_FAIL,
    ADMIN_TOP_MOST_RATING_SUCCESS,
    ADMIN_TOP_MOST_RATING_FAIL,
    ADMIN_TOP_MOST_JOBSEEKER_SUCCESS,
    ADMIN_TOP_MOST_JOBSEEKER_FAIL,

  } from '../Constants/AdminConstants';

const initialState = {
  topCompanyReviewes: null,
  topCompanyReviewesError: null
}

export const TopCompanyListReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_TOP_MOST_REVIEWED_SUCCESS:
        return { 
            ...state,
            topCompanyReviewes: action.payload, 
            };
    case ADMIN_TOP_MOST_REVIEWED_FAIL:
        return {
            ...state,
            topCompanyReviewesError: action.payload
          };
    default:
      return { ...state };
  }
};

const initialState1 = {
    topCompanyRatings: null,
    topCompanyRatingsError: null
  }

  export const TopCompanyListRatingReducer = (state = initialState1, action) => {
    switch (action.type) {
      case ADMIN_TOP_MOST_RATING_SUCCESS:
          return { 
              ...state,
              topCompanyRatings: action.payload, 
              };
      case ADMIN_TOP_MOST_RATING_FAIL:
          return {
              ...state,
              topCompanyRatingsError: action.payload
            };
      default:
        return { ...state };
    }
  };
  const initialState2 = {
    topAcceptedJobseeker: null,
    topAcceptedJobseekerError: null
  }

  export const TopAcceptedJobSeekerReducer = (state = initialState2, action) => {
    switch (action.type) {
      case ADMIN_TOP_MOST_JOBSEEKER_SUCCESS:
          return { 
              ...state,
              topAcceptedJobseeker: action.payload, 
              };
      case ADMIN_TOP_MOST_JOBSEEKER_FAIL:
          return {
              ...state,
              topAcceptedJobseekerError: action.payload
            };
      default:
        return { ...state };
    }
  };