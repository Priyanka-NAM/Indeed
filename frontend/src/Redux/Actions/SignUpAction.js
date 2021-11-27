import { 
    JOBSEEKER_SIGNUP,
    SIGNUP_ERROR
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const jobSeekerSignUp = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/public/signup`, data, config)
    .then((response) => {
        dispatch({
            type : JOBSEEKER_SIGNUP,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: SIGNUP_ERROR,
            payload: error
        })
    });
}