import {
    FETCH_ALL_JOBS,
    ERROR
} from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const fetchAllJobs = () => (dispatch) => {
    Axios.get(`${API}/users/public/jobs`)
    .then((response) => {
        dispatch({
            type : FETCH_ALL_JOBS,
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

