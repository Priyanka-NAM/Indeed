import {
    FETCH_ALL_JOBS,
    FETCH_QUERIED_JOBS,
    FETCH_Q_JOBS,
    JOB_ERROR,
    POST_SAVED_JOBS,
    DELETE_SAVED_JOBS,
    GET_SAVED_JOBS,
    GET_USER_REVIEWS,
    REVIEW_ERROR,
    APPLY_JOB
} from '../Constants/UserConstants';
import {
    GET_JOB_APPLICANTS_REQUEST,
    GET_JOB_APPLICANTS_SUCCESS,
    GET_JOB_APPLICANTS_FAIL,
    GET_JOB_APPLICANTS_RESET
} from '../Constants/JobConstants';
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


export const fetchQJobs = (data) => (dispatch) => {
    Axios.get(`${API}/users/public/jobs`,{
        params:data
    })
    .then((response) => {
        dispatch({
            type : FETCH_Q_JOBS,
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

export const postSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/saved-jobs`, data, config)
    .then((response) => {
        dispatch({
            type: POST_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
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
    Axios.delete(`${API}/users/saved-jobs`, {data : data}, config)
    .then((response) => {
        dispatch({
            type: DELETE_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const getSavedJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.get(`${API}/users/saved-jobs`, {
        params:data
    }, config)
    .then((response) => {
        dispatch({
            type: GET_SAVED_JOBS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const getUserReviews = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.get(`${API}/users/reviews`, {
        params:data
    }, config)
    .then((response) => {
        dispatch({
            type: GET_USER_REVIEWS,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: REVIEW_ERROR,
            payload: error
        })
    })
}

export const applyJobs = (data) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    Axios.post(`${API}/users/apply-job`, data, config)
    .then((response) => {
        dispatch({
            type: APPLY_JOB,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: JOB_ERROR,
            payload: error
        })
    })
}

export const getJobApplicants = (id) => async(dispatch) => {
    try{
        dispatch({
            type: GET_JOB_APPLICANTS_REQUEST
        })
        const { data } = await Axios.get(`${API}/employer/job-applicants/${id}`)
        dispatch({
            type: GET_JOB_APPLICANTS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: GET_JOB_APPLICANTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

