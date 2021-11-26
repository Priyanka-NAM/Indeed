import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    JOB_ERROR
} from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const fetchAllJobs = (data) => (dispatch) => {
    //console.log(data.job.length, data.location.length )
    console.log("action job  : ", data)
    if (data.job || data.location) {
        Axios.get(`${API}/users/public/jobs`,{
            params:data
        })
        .then((response) => {
            dispatch({
                type : FETCH_QUERIED_JOBS,
                payload : response.data 
            })
        })
        .catch(error => {
            dispatch({
                type: JOB_ERROR,
                payload: error
            })
        });
    } else {
        console.log("here")
        Axios.get(`${API}/users/public/jobs`,{
            params:data
        })
        .then((response) => {
            dispatch({
                type : FETCH_ALL_JOBS,
                payload : response.data 
            })
        })
        .catch(error => {
            dispatch({
                type: JOB_ERROR,
                payload: error
            })
        });
    }
}
