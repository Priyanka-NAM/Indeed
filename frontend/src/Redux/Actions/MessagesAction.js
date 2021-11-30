import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_DISTINCT_EMPLOYERS,
    GET_MSGS_JOBSEEKERS,
    MESSAGE_ERROR
} from "../Constants/MessageConstants";
import Axios from 'axios';
import { API } from "../../config";

export const sendMessageAction = (messageId, employerId, userId, messageText, isReply) => async(dispatch, getState) => {

    try{

        dispatch({ type: SEND_MESSAGE_REQUEST})

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await Axios.post(`${API}/messages/send-message`, { messageId, employerId, userId, messageText, isReply }, config);

        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error
        })
    }
}

export const getDistinctEmployer = (data) => (dispatch) => {
    Axios.get(`${API}/messages/distinct-employers/`,{
        params: data
    }).then(response => {
        dispatch({
            type : GET_DISTINCT_EMPLOYERS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    });
}

export const getMessagesJobSeeker = (data) => (dispatch) => {
    Axios.get(`${API}/messages/user-messages/`,{
        params: data
    }).then(response => {
        dispatch({
            type : GET_MSGS_JOBSEEKERS,
            payload : response.data 
        })
    })
    .catch(error => {
        dispatch({
            type: MESSAGE_ERROR,
            payload: error
        })
    });
}