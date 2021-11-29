import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    JOB_ERROR,
    POST_SAVED_JOBS,
    SAVED_JOB_ERROR,
    DELETE_SAVED_JOBS,
    DELETE_JOB_ERROR
} from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const fetchAllJobs = (data) => (dispatch) => {
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

export const postSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/user-details`, data, config)
    .then((response) => {
        dispatch({
            type: POST_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: SAVED_JOB_ERROR,
            payload: error
        })
    })
}

export const deleteSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.delete(`${API}/users/user-details`, {data : data}, config)
    .then((response) => {
        dispatch({
            type: DELETE_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: DELETE_JOB_ERROR,
            payload: error
        })
    })
}