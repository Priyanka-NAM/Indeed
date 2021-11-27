import { EMPLOYER_DETAILS_ADD, EMPLOYER_DETAILS_ERROR } from "../Constants/UserConstants";

import Axios from "axios";
import { API } from "../../config";

export const employerDetailsAdd = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const newdata = { ...data, employerID: 18 };
  console.log("data", newdata);
  Axios.post(`${API}/employer/updateemployer`, newdata, config)
    .then((response) => {
      dispatch({
        type: EMPLOYER_DETAILS_ADD,
        payload: response.newdata,
      });
    })
    .catch((error) => {
      console.log("Error from backend", error);
      dispatch({
        type: EMPLOYER_DETAILS_ERROR,
        payload: error,
      });
    });
};
