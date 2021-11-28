import {
    ADMIN_TOP_MOST_REVIEWED_SUCCESS,
    ADMIN_TOP_MOST_REVIEWED_FAIL,
    ADMIN_TOP_MOST_RATING_SUCCESS,
    ADMIN_TOP_MOST_RATING_FAIL,
    ADMIN_TOP_MOST_JOBSEEKER_SUCCESS,
    ADMIN_TOP_MOST_JOBSEEKER_FAIL,
    ADMIN_GET_ALL_REVIEWS_SUCCESS,
    ADMIN_GET_ALL_REVIEWS_FAIL,
    ADMIN_TOP_MOST_CEOS_SUCCESS,
    ADMIN_TOP_MOST_CEOS_FAIL,

  } from '../Constants/AdminConstants';

  import Axios from 'axios'; 
  import { API } from '../../config';

  export const getTopReviewedCompanies = (data) => (dispatch) => {
   
  Axios.get(`${API}/admin/get-top-reviewedcomapnies`)
  .then((response) => {
      dispatch({
          type : ADMIN_TOP_MOST_REVIEWED_SUCCESS,
          payload : response.data 
      })
  })
  .catch(error => {
      dispatch({
          type: ADMIN_TOP_MOST_REVIEWED_FAIL,
          payload: error
      })
  });
  
  }
  export const getTopRatedCompanies = (data) => (dispatch) => {
   
    Axios.get(`${API}/admin/get-top-ratedcomapnies`)
    .then((response) => {
        dispatch({
            type : ADMIN_TOP_MOST_RATING_SUCCESS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: ADMIN_TOP_MOST_RATING_FAIL,
            payload: error
        })
    });
    
    }
    export const getTopAcceptedJobseekers = (data) => (dispatch) => {
   
        Axios.get(`${API}/admin/get-top-acceptedreview-users`)
        .then((response) => {
            dispatch({
                type : ADMIN_TOP_MOST_JOBSEEKER_SUCCESS,
                payload : response.data 
            })
        })
        .catch(error => {
            dispatch({
                type: ADMIN_TOP_MOST_JOBSEEKER_FAIL,
                payload: error
            })
        });
        
        }

        export const getTopRatedCeos = (data) => (dispatch) => {
   
            Axios.get(`${API}/admin/get-top-rated-ceos`)
            .then((response) => {
                dispatch({
                    type : ADMIN_TOP_MOST_CEOS_SUCCESS,
                    payload : response.data 
                })
            })
            .catch(error => {
                dispatch({
                    type: ADMIN_TOP_MOST_CEOS_FAIL,
                    payload: error
                })
            });
            
            }


            export const getAllReviews = (data) => (dispatch) => {
   
                Axios.get(`${API}/company/reviews`)
                .then((response) => {
                    dispatch({
                        type : ADMIN_GET_ALL_REVIEWS_SUCCESS,
                        payload : response.data 
                    })
                })
                .catch(error => {
                    dispatch({
                        type: ADMIN_GET_ALL_REVIEWS_FAIL,
                        payload: error
                    })
                });
                
                }