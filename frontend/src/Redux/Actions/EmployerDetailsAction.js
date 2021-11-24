import { EMPLOYER_DETAILS_ADD, ERROR } from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerDetailsAdd = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const newdata = { ...data, employerID: 12 };
  console.log("data", newdata);
  Axios.post(`${API}/employer/addemployer`, newdata, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_DETAILS_ADD,
        payload: response.newdata,
      });
    })
    .catch((error) => {
      dispatch({
        type: ERROR,
        payload: error,
      });
    });
};
