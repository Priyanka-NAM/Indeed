import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL
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