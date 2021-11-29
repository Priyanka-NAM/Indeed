import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    GET_USER_MESSAGES_REQUEST,
    GET_USER_MESSAGES_SUCCESS,
    GET_USER_MESSAGES_FAIL,
    GET_EMPLOYER_MESSAGES_REQUEST,
    GET_EMPLOYER_MESSAGES_SUCCESS,
    GET_EMPLOYER_MESSAGES_FAIL,
    SEND_MESSAGE_RESET
} from '../Constants/MessageConstants';

export const sendMessageReducer = (state= {}, action) => {

    switch(action.type){
        case SEND_MESSAGE_REQUEST:
            return { loading: true }
        case SEND_MESSAGE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case SEND_MESSAGE_FAIL:
            return { loading: false, error: action.payload }
        case SEND_MESSAGE_RESET:
            return {}
        default:
            return state
    }
}

export const getUserMessagesReducer = (state = { userMessages: []}, action) => {

    switch (action.type){
        case GET_USER_MESSAGES_REQUEST:
            return { loading: true }
        case GET_USER_MESSAGES_SUCCESS:
            return { loading: false, userMessages: action.payload }
        case GET_USER_MESSAGES_FAIL:
            return { loading: false, error: action.payload }
    }
}