import {
    CUSTOMER_SIGNUP_REQUEST,
    CUSTOMER_SIGNUP_FAIL,
    CUSTOMER_SIGNUP_SUCCESS,
  } from '../Constants/UserConstants';
import Axios from 'axios'; 
import { API } from '../../config';

export const jobSeekerSignUp = (email, password, role) => async (dispatch) => {
    try {
        dispatch({
            type: CUSTOMER_SIGNUP_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await Axios.post(
            `${API}/users/public/signup`,
            { email, password, role },
            config
        )

        dispatch({
            type: CUSTOMER_SIGNUP_SUCCESS,
            payload: data,
        })


        localStorage.setItem('jobSeekerInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: CUSTOMER_SIGNUP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}