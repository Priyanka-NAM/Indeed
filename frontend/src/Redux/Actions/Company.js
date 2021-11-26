import {
    COMPANY_LIST_SUCCESS,
    COMPANY_LIST_FAIL,
    COMPANY_LIST_REVIEWS_SUCCESS,
    COMPANY_LIST_REVIEWS_FAIL,
  } from '../Constants/Company';
  
  import Axios from 'axios'; 
  import { API } from '../../config';

export const getcompaniesDetails = (data) => (dispatch) => {
    const config = {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
      }
    Axios.get(`${API}/company/home`, 
    {
    params: data
  },
  config)
    .then((response) => {
        dispatch({
            type : COMPANY_LIST_SUCCESS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: COMPANY_LIST_FAIL,
            payload: error
        })
    });
}

export const getCompanySpecificReviews = (data) => (dispatch) => {
  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    },
  }
Axios.get(`${API}/company/company-specific-reviews`, 
{
params: data
},
config)
.then((response) => {
    dispatch({
        type : COMPANY_LIST_REVIEWS_SUCCESS,
        payload : response.data 
    })
})
.catch(error => {
    dispatch({
        type: COMPANY_LIST_REVIEWS_FAIL,
        payload: error
    })
});

}