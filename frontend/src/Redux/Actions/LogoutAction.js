import { 
    LOGOUT,
    ERROR
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';


export const jobSeekerLogin = (data) => (dispatch) => {
    Axios.post(`${API}/users/public/login`, data)
    .then((response) => {
        dispatch({
            type : LOGOUT,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}