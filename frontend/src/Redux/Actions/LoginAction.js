import { 
    JOBSEEKER_LOGIN,
    LOGIN_ERROR
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';


export const jobSeekerLogin = (data) => (dispatch) => {
    Axios.post(`${API}/users/public/login`, data)
    .then((response) => {
        dispatch({
            type : JOBSEEKER_LOGIN,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: LOGIN_ERROR,
            payload: error
        })
    });
}